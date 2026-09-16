"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Html, Lightformer } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Quality } from "./support";

type Props = {
  progress: MotionValue<number>;
  quality: Quality;
  running: boolean;
  reducedMotion: boolean;
  onReady: () => void;
};

const { damp, clamp, smoothstep, lerp } = THREE.MathUtils;
const HALF_PI = Math.PI / 2;
const Z = 0.12; // pipe plane, just proud of the blockwork
const SUPPLY_R = 0.055;
const DRAIN_R = 0.09;

/** 0→1 over [a, b], eased. */
const win = (p: number, a: number, b: number) => smoothstep(p, a, b);

type Seg = { from: [number, number]; to: [number, number]; r: number; kind: "supply" | "drain" };

const segments: Seg[] = [
  { from: [2.0, -0.05], to: [2.0, 2.3], r: SUPPLY_R, kind: "supply" }, // 0 riser
  { from: [1.32, 2.3], to: [0.4, 2.3], r: SUPPLY_R, kind: "supply" }, // 1 main run (through tee)
  { from: [0.4, 2.3], to: [0.4, 1.55], r: SUPPLY_R, kind: "supply" }, // 2 drop to mixer
  { from: [1.2, 2.3], to: [1.2, 1.05], r: SUPPLY_R, kind: "supply" }, // 3 tee branch to bib cock
  { from: [-0.3, 0.25], to: [1.55, 0.25], r: DRAIN_R, kind: "drain" }, // 4 drain run
  { from: [1.55, 0.25], to: [1.55, -0.1], r: DRAIN_R, kind: "drain" }, // 5 drain into slab
  { from: [0.15, 0.95], to: [0.15, 0.25], r: DRAIN_R, kind: "drain" }, // 6 waste drop
];

/** Surface build-up on the left of the wall, stepped like a section drawing. */
const layers = [
  { name: "Plaster", right: 0.0, depth: 0.18, color: "#d6cfc1" },
  { name: "Putty", right: -0.6, depth: 0.05, color: "#ede8de" },
  { name: "Primer", right: -1.15, depth: 0.03, color: "#fbfaf6" },
  { name: "Final coat", right: -1.7, depth: 0.035, color: "#a9bccc" },
];
const WALL_LEFT = -2.4;

const labels = [
  { text: "Planned route", pos: [1.2, 2.72, 0.2], window: [0.04, 0.26] },
  { text: "Supply line", pos: [2.28, 1.3, 0.2], window: [0.3, 0.52] },
  { text: "Drainage", pos: [0.6, -0.12, 0.45], window: [0.32, 0.52] },
  { text: "Defective section removed", pos: [1.6, 2.95, 0.7], window: [0.54, 0.74] },
  { text: "Plaster · Putty · Primer · Final coat", pos: [-1.2, 3.5, 0.3], window: [0.82, 1.01] },
] as const;

function Model({ progress, quality, reducedMotion }: Omit<Props, "running" | "onReady">) {
  const radial = quality === "high" ? 32 : 16;
  const p = useRef(0);
  const segRefs = useRef<(THREE.Mesh | null)[]>([]);
  const fittingRefs = useRef<(THREE.Object3D | null)[]>([]);
  const layerRefs = useRef<(THREE.Mesh | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spool = useRef<THREE.Group>(null);
  const spoolMesh = useRef<THREE.Mesh>(null);
  const flowMesh = useRef<THREE.Mesh>(null);
  const couplingL = useRef<THREE.Mesh>(null);
  const couplingR = useRef<THREE.Mesh>(null);
  const routeMat = useRef<THREE.LineDashedMaterial>(null);
  const { camera, size } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  const mats = useMemo(
    () => ({
      clay: new THREE.MeshStandardMaterial({ color: "#e7e2d8", roughness: 0.92 }),
      block: new THREE.MeshStandardMaterial({ color: "#c9c2b5", roughness: 0.95 }),
      supply: new THREE.MeshStandardMaterial({ color: "#6f98c4", metalness: 0.25, roughness: 0.42 }),
      drain: new THREE.MeshStandardMaterial({ color: "#a7afb8", metalness: 0.05, roughness: 0.6 }),
      fitting: new THREE.MeshStandardMaterial({ color: "#e9ecef", metalness: 0.35, roughness: 0.35 }),
      spool: new THREE.MeshStandardMaterial({
        color: "#6f98c4",
        metalness: 0.25,
        roughness: 0.42,
        emissive: "#b79a63",
        emissiveIntensity: 0,
      }),
      layers: layers.map(
        (l) => new THREE.MeshStandardMaterial({ color: l.color, roughness: 0.85, transparent: true, opacity: 0 }),
      ),
      flow: new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uColor: { value: new THREE.Color("#8fc3f2") },
          uRepeat: { value: 14 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpacity;
          uniform float uRepeat;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float d = fract(vUv.x * uRepeat - uTime);
            float a = smoothstep(0.0, 0.12, d) * (1.0 - smoothstep(0.3, 0.46, d));
            gl_FragColor = vec4(uColor, a * uOpacity);
          }
        `,
      }),
    }),
    [],
  );

  const flowGeometries = useMemo(() => {
    const v = (x: number, y: number) => new THREE.Vector3(x, y, Z + 0.075);
    const main = new THREE.CurvePath<THREE.Vector3>();
    [
      [v(2.0, 0), v(2.0, 2.3)],
      [v(2.0, 2.3), v(0.4, 2.3)],
      [v(0.4, 2.3), v(0.4, 1.55)],
    ].forEach(([a, b]) => main.add(new THREE.LineCurve3(a, b)));
    const branch = new THREE.LineCurve3(v(1.2, 2.3), v(1.2, 1.05));
    return [
      new THREE.TubeGeometry(main as unknown as THREE.Curve<THREE.Vector3>, 160, 0.014, 6, false),
      new THREE.TubeGeometry(branch, 40, 0.014, 6, false),
    ];
  }, []);

  const routeGeometry = useMemo(() => {
    const pts = [
      [2.0, 0],
      [2.0, 2.3],
      [0.4, 2.3],
      [0.4, 1.55],
      [0.4, 2.3],
      [1.2, 2.3],
      [1.2, 1.05],
    ].map(([x, y]) => new THREE.Vector3(x, y, Z + 0.02));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return g;
  }, []);
  const routeLine = useMemo(() => {
    const line = new THREE.Line(
      routeGeometry,
      new THREE.LineDashedMaterial({ color: "#b79a63", dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0 }),
    );
    line.computeLineDistances();
    return line;
  }, [routeGeometry]);

  useEffect(() => {
    routeMat.current = routeLine.material as THREE.LineDashedMaterial;
    return () => {
      routeGeometry.dispose();
      (routeLine.material as THREE.Material).dispose();
      flowGeometries.forEach((g) => g.dispose());
      Object.values(mats)
        .flat()
        .forEach((m) => (m as THREE.Material).dispose());
    };
  }, [routeLine, routeGeometry, flowGeometries, mats]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const target = progress.get();
    p.current = reducedMotion ? target : damp(p.current, target, 5, dt);
    const t = p.current;

    // Planning — dashed route
    if (routeMat.current) routeMat.current.opacity = win(t, 0.02, 0.14) * (1 - win(t, 0.36, 0.48)) * 0.95;

    // Installation — segments grow in sequence
    const install = win(t, 0.2, 0.46);
    segments.forEach((s, i) => {
      const mesh = segRefs.current[i];
      if (!mesh) return;
      const k = clamp(install * segments.length - i * 0.85, 0, 1);
      const [fx, fy] = s.from;
      const [tx, ty] = s.to;
      mesh.visible = k > 0.001;
      mesh.scale.set(1, Math.max(k, 0.0001), 1);
      mesh.position.set(fx + (tx - fx) * (k / 2), fy + (ty - fy) * (k / 2), Z);
    });
    fittingRefs.current.forEach((f, i) => {
      if (!f) return;
      const k = win(install, 0.25 + i * 0.06, 0.45 + i * 0.06);
      f.visible = k > 0.001;
      f.scale.setScalar(Math.max(k, 0.0001));
    });

    // Repair — defective spool lifts out, couplings slide back
    const sep = win(t, 0.5, 0.6) * (1 - win(t, 0.7, 0.8));
    const spoolIn = win(install, 0.12, 0.35);
    if (spool.current) {
      spool.current.visible = spoolIn > 0.001;
      spool.current.scale.setScalar(Math.max(spoolIn, 0.0001));
      spool.current.position.set(1.61, 2.3 + sep * 0.22, Z + sep * 0.62);
      spool.current.rotation.y = sep * 0.28;
    }
    [couplingL.current, couplingR.current].forEach((c, i) => {
      if (!c) return;
      c.visible = spoolIn > 0.001;
      c.scale.setScalar(Math.max(spoolIn, 0.0001));
      c.position.x = i === 0 ? 1.36 - sep * 0.1 : 1.86 + sep * 0.1;
    });
    if (spoolMesh.current) {
      (spoolMesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        win(t, 0.48, 0.58) * (1 - win(t, 0.76, 0.86)) * 0.9;
    }

    // Flow — runs once installed, pauses for repair, resumes at finish
    const flowOn = win(t, 0.4, 0.48) * (1 - win(t, 0.5, 0.56)) + win(t, 0.8, 0.9) * 0.75;
    if (flowMesh.current) {
      const uniforms = (flowMesh.current.material as THREE.ShaderMaterial).uniforms;
      uniforms.uOpacity.value = flowOn;
      if (!reducedMotion) uniforms.uTime.value += dt * 0.55;
    }

    // Finish — layers arrive from an exploded position and close up
    layers.forEach((l, i) => {
      const mesh = layerRefs.current[i];
      if (!mesh) return;
      const k = win(t, 0.7 + i * 0.05, 0.86 + i * 0.05);
      const base = layers.slice(0, i).reduce((z, x) => z + x.depth, 0) + l.depth / 2;
      mesh.position.z = base + (1 - k) * (0.38 + i * 0.16);
      mesh.position.y = 1.6 + (1 - k) * 0.08 * (i + 1);
      (mesh.material as THREE.MeshStandardMaterial).opacity = Math.min(1, k * 2.2);
      mesh.visible = k > 0.001;
    });

    // Labels
    labels.forEach((label, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      const [a, b] = label.window;
      const o = win(t, a, a + 0.05) * (1 - win(t, b - 0.05, b));
      el.style.opacity = String(o);
      el.style.transform = `translateY(${(1 - o) * 6}px)`;
    });

    // Camera — a slow dolly, with a lean toward the joint during repair
    // Narrow (portrait) canvases pull the camera back so the model still fits.
    const fit = clamp(1.3 / (size.width / size.height), 1, 2.4);
    lookAt.set(lerp(0.05, -0.15, t) + sep * 0.9, 1.35 + sep * 0.45, 0);
    const cx = lookAt.x + (lerp(6.6, 4.9, t) - lookAt.x) * fit + (reducedMotion ? 0 : state.pointer.x * 0.15);
    const cy = lookAt.y + (lerp(4.4, 3.2, t) - lookAt.y) * fit;
    const cz = lerp(8.8, 7.4, t) * fit;
    camera.position.set(
      damp(camera.position.x, cx, 3, dt),
      damp(camera.position.y, cy, 3, dt),
      damp(camera.position.z, cz, 3, dt),
    );
    camera.lookAt(lookAt);
  });

  const segGeometry = (s: Seg) => {
    const len = Math.hypot(s.to[0] - s.from[0], s.to[1] - s.from[1]);
    return <cylinderGeometry args={[s.r, s.r, len, radial, 1, true]} />;
  };
  const isHorizontal = (s: Seg) => s.from[1] === s.to[1];

  const fittings: { pos: [number, number, number]; r: number; kind: "supply" | "drain" }[] = [
    { pos: [2.0, 2.3, Z], r: SUPPLY_R * 1.45, kind: "supply" },
    { pos: [1.2, 2.3, Z], r: SUPPLY_R * 1.5, kind: "supply" },
    { pos: [0.4, 2.3, Z], r: SUPPLY_R * 1.45, kind: "supply" },
    { pos: [1.55, 0.25, Z], r: DRAIN_R * 1.3, kind: "drain" },
    { pos: [0.15, 0.25, Z], r: DRAIN_R * 1.3, kind: "drain" },
  ];

  return (
    <group>
      {/* Floor slab and blockwork wall */}
      <mesh position={[0, -0.15, 0.7]} material={mats.clay} receiveShadow>
        <boxGeometry args={[5.6, 0.3, 2.8]} />
        <Edges threshold={15} color="#0b1624" lineWidth={1} transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, 1.6, -0.25]} material={mats.block} receiveShadow castShadow>
        <boxGeometry args={[4.8, 3.2, 0.5]} />
        <Edges threshold={15} color="#0b1624" lineWidth={1} transparent opacity={0.32} />
      </mesh>
      {/* Coursing lines on the blockwork */}
      {[0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8].map((y) => (
        <mesh key={y} position={[0, y, 0.002]}>
          <planeGeometry args={[4.8, 0.006]} />
          <meshBasicMaterial color="#0b1624" transparent opacity={0.08} />
        </mesh>
      ))}

      {/* Planned route */}
      <primitive object={routeLine} />

      {/* Pipe segments */}
      {segments.map((s, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              segRefs.current[i] = el;
            }}
            rotation={isHorizontal(s) ? [0, 0, HALF_PI] : [0, 0, 0]}
            material={s.kind === "supply" ? mats.supply : mats.drain}
            castShadow
          >
            {segGeometry(s)}
          </mesh>
        </group>
      ))}

      {/* Fittings */}
      {fittings.map((f, i) => (
        <mesh
          key={i}
          ref={(el) => {
            fittingRefs.current[i] = el;
          }}
          position={f.pos}
          material={f.kind === "supply" ? mats.fitting : mats.drain}
          castShadow
        >
          <sphereGeometry args={[f.r, radial, radial / 2]} />
        </mesh>
      ))}

      {/* Outlets */}
      {[
        [0.4, 1.55],
        [1.2, 1.05],
      ].map(([x, y], i) => (
        <group
          key={i}
          ref={(el) => {
            fittingRefs.current[fittings.length + i] = el;
          }}
          position={[x, y, Z]}
        >
          <mesh rotation={[HALF_PI, 0, 0]} position={[0, 0, 0.14]} material={mats.fitting} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.28, radial]} />
          </mesh>
          <mesh position={[0, 0.07, 0.2]} material={mats.fitting}>
            <boxGeometry args={[0.03, 0.12, 0.03]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={mats.fitting}>
            <sphereGeometry args={[SUPPLY_R * 1.5, radial, radial / 2]} />
          </mesh>
        </group>
      ))}

      {/* Replaceable spool with its couplings */}
      <group ref={spool}>
        <mesh ref={spoolMesh} rotation={[0, 0, HALF_PI]} material={mats.spool} castShadow>
          <cylinderGeometry args={[SUPPLY_R, SUPPLY_R, 0.44, radial, 1, true]} />
        </mesh>
      </group>
      <mesh ref={couplingL} position={[1.36, 2.3, Z]} rotation={[0, 0, HALF_PI]} material={mats.fitting} castShadow>
        <cylinderGeometry args={[SUPPLY_R * 1.4, SUPPLY_R * 1.4, 0.12, radial]} />
      </mesh>
      <mesh ref={couplingR} position={[1.86, 2.3, Z]} rotation={[0, 0, HALF_PI]} material={mats.fitting} castShadow>
        <cylinderGeometry args={[SUPPLY_R * 1.4, SUPPLY_R * 1.4, 0.12, radial]} />
      </mesh>

      {/* Flow */}
      {flowGeometries.map((g, i) => (
        <mesh key={i} ref={i === 0 ? flowMesh : undefined} geometry={g} material={mats.flow} renderOrder={2} />
      ))}

      {/* Surface build-up */}
      {layers.map((l, i) => {
        const width = l.right - WALL_LEFT;
        return (
          <mesh
            key={l.name}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            position={[WALL_LEFT + width / 2, 1.6, 0]}
            material={mats.layers[i]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[width, 3.2, l.depth]} />
          </mesh>
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => (
        <Html key={label.text} position={label.pos as unknown as [number, number, number]} center zIndexRange={[20, 0]}>
          <div
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            style={{ opacity: 0 }}
            className="pointer-events-none flex items-center gap-2 bg-ink/85 px-2.5 py-1.5 text-[0.6875rem] tracking-[0.12em] whitespace-nowrap text-paper uppercase ring-1 ring-paper/15 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-brass" />
            {label.text}
          </div>
        </Html>
      ))}
    </group>
  );
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(() => onReady());
  });
  return null;
}

export default function SystemScene({ progress, quality, running, reducedMotion, onReady }: Props) {
  const high = quality === "high";
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={high ? [1, 1.75] : [1, 1.3]}
      shadows={high ? "percentage" : false}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 30, position: [6.6, 4.4, 8.8], near: 0.1, far: 60 }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#f3efe6", "#1a2a3c", 0.55]} />
      <directionalLight
        position={[5, 7, 6]}
        intensity={2.1}
        color="#fff6e8"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={1.6} position={[0, 6, 4]} rotation-x={HALF_PI} scale={[10, 4, 1]} />
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#9fbad6"
          position={[-6, 2, 2]}
          rotation-y={HALF_PI}
          scale={[3, 8, 1]}
        />
      </Environment>
      <Model progress={progress} quality={quality} reducedMotion={reducedMotion} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
