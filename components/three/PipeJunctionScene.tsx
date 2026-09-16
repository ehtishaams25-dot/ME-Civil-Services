"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Quality } from "./support";

export type PartId = "tee" | "valve" | "union" | "elbow" | "flange";

type SceneProps = {
  active: PartId | null;
  onHover: (part: PartId | null) => void;
  quality: Quality;
  running: boolean;
  reducedMotion: boolean;
  onReady: () => void;
};

const R = 0.3; // pipe radius
const HALF_PI = Math.PI / 2;
const { damp } = THREE.MathUtils;

/* -------------------------------------------------------------------------- */
/* Geometry                                                                    */
/* -------------------------------------------------------------------------- */

function useSegments(quality: Quality) {
  return quality === "high" ? { radial: 56, tubular: 72 } : { radial: 24, tubular: 28 };
}

/** Chamfered collar revolved around Y. */
function collar(r: number, length: number, scale: number, radial: number) {
  const outer = r * scale;
  const c = Math.min(0.04, length * 0.2);
  const pts = [
    new THREE.Vector2(r * 0.98, -length / 2),
    new THREE.Vector2(outer - c, -length / 2),
    new THREE.Vector2(outer, -length / 2 + c),
    new THREE.Vector2(outer, length / 2 - c),
    new THREE.Vector2(outer - c, length / 2),
    new THREE.Vector2(r * 0.98, length / 2),
  ];
  return new THREE.LatheGeometry(pts, radial);
}

/** Flange disc with a short hub, revolved around Y (face points +Y). */
function flangeDisc(r: number, radial: number) {
  const F = r * 2.15;
  const t = 0.13;
  const pts = [
    new THREE.Vector2(r * 0.98, -0.2),
    new THREE.Vector2(r * 1.3, -0.2),
    new THREE.Vector2(r * 1.36, -t / 2 - 0.02),
    new THREE.Vector2(F - 0.03, -t / 2),
    new THREE.Vector2(F, -t / 2 + 0.03),
    new THREE.Vector2(F, t / 2 - 0.03),
    new THREE.Vector2(F - 0.03, t / 2),
    new THREE.Vector2(r * 0.98, t / 2),
  ];
  return new THREE.LatheGeometry(pts, radial);
}

/** Cast valve body — a swelling profile along Y. */
function valveBody(r: number, length: number, radial: number) {
  const pts: THREE.Vector2[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const swell = Math.sin(t * Math.PI);
    pts.push(new THREE.Vector2(r * (1.22 + 0.62 * Math.pow(swell, 1.6)), -length / 2 + t * length));
  }
  pts.unshift(new THREE.Vector2(r * 0.98, -length / 2));
  pts.push(new THREE.Vector2(r * 0.98, length / 2));
  return new THREE.LatheGeometry(pts, radial);
}

/* -------------------------------------------------------------------------- */
/* Materials                                                                   */
/* -------------------------------------------------------------------------- */

function useMaterials() {
  return useMemo(() => {
    const pipe = new THREE.MeshPhysicalMaterial({
      color: "#2f3b48",
      metalness: 0.55,
      roughness: 0.38,
      clearcoat: 0.6,
      clearcoatRoughness: 0.28,
    });
    const steel = () =>
      new THREE.MeshStandardMaterial({
        color: "#c6cbd1",
        metalness: 1,
        roughness: 0.24,
        emissive: "#b79a63",
        emissiveIntensity: 0,
      });
    const cast = () =>
      new THREE.MeshStandardMaterial({
        color: "#5f6873",
        metalness: 1,
        roughness: 0.42,
        emissive: "#b79a63",
        emissiveIntensity: 0,
      });
    const brass = () =>
      new THREE.MeshStandardMaterial({
        color: "#b79a63",
        metalness: 1,
        roughness: 0.26,
        emissive: "#b79a63",
        emissiveIntensity: 0,
      });

    const parts: Record<PartId, THREE.MeshStandardMaterial[]> = {
      tee: [steel()],
      valve: [cast(), brass(), steel()],
      union: [steel(), cast()],
      elbow: [steel()],
      flange: [steel(), cast()],
    };
    return { pipe, parts };
  }, []);
}

/* -------------------------------------------------------------------------- */
/* Parts                                                                       */
/* -------------------------------------------------------------------------- */

type Axis = "x" | "y" | "z";
const axisRotation: Record<Axis, [number, number, number]> = {
  x: [0, 0, HALF_PI],
  y: [0, 0, 0],
  z: [HALF_PI, 0, 0],
};

function Pipe({
  axis,
  from,
  to,
  at,
  material,
  radial,
}: {
  axis: Axis;
  from: number;
  to: number;
  at: [number, number];
  material: THREE.Material;
  radial: number;
}) {
  const length = Math.abs(to - from);
  const mid = (from + to) / 2;
  const position: [number, number, number] =
    axis === "x" ? [mid, at[0], at[1]] : axis === "y" ? [at[0], mid, at[1]] : [at[0], at[1], mid];
  return (
    <mesh position={position} rotation={axisRotation[axis]} material={material}>
      <cylinderGeometry args={[R, R, length, radial, 1, true]} />
    </mesh>
  );
}

function hoverHandlers(id: PartId, onHover: (p: PartId | null) => void) {
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      onHover(id);
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      onHover(null);
    },
  };
}

function Bolts({
  radius,
  count,
  material,
  radial,
}: {
  radius: number;
  count: number;
  material: THREE.Material;
  radial: number;
}) {
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2 + Math.PI / count),
    [count],
  );
  return (
    <group>
      {items.map((a, i) => (
        <group key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]}>
          <mesh material={material} position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.06, 6]} />
          </mesh>
          <mesh material={material} position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.06, 6]} />
          </mesh>
          <mesh material={material}>
            <cylinderGeometry args={[0.028, 0.028, 0.26, Math.max(8, radial / 4)]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Assembly({ active, onHover, quality, reducedMotion }: Omit<SceneProps, "running" | "onReady">) {
  const { radial, tubular } = useSegments(quality);
  const { pipe, parts } = useMaterials();
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const start = useRef<number | null>(null);

  const geo = useMemo(
    () => ({
      collarLong: collar(R, 0.18, 1.24, radial),
      collarShort: collar(R, 0.12, 1.24, radial),
      unionNut: new THREE.CylinderGeometry(R * 1.52, R * 1.52, 0.22, 6),
      unionBody: collar(R, 0.5, 1.3, radial),
      flange: flangeDisc(R, radial),
      valveBody: valveBody(R, 1.0, radial),
      elbow: new THREE.TorusGeometry(0.62, R * 1.1, Math.max(16, radial / 2), tubular, HALF_PI),
      teeRun: new THREE.CylinderGeometry(R * 1.12, R * 1.12, 1.0, radial, 1, true),
      teeBranch: new THREE.CylinderGeometry(R * 1.12, R * 1.12, 0.5, radial, 1, true),
      teeHub: new THREE.SphereGeometry(R * 1.12, radial, Math.max(12, radial / 2)),
    }),
    [radial, tubular],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      pipe.dispose();
      Object.values(parts)
        .flat()
        .forEach((m) => m.dispose());
    },
    [geo, pipe, parts],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;

    // Entrance: settle from a slightly rotated, lowered position.
    const k = reducedMotion ? 1 : Math.min((t - start.current) / 2.4, 1);
    const intro = 1 - Math.pow(1 - k, 4);

    smooth.current.x = damp(smooth.current.x, pointer.current.x, 2.2, dt);
    smooth.current.y = damp(smooth.current.y, pointer.current.y, 2.2, dt);
    const px = reducedMotion ? 0 : smooth.current.x;
    const py = reducedMotion ? 0 : smooth.current.y;

    const drift = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.02;
    g.rotation.y = -0.62 + px * 0.26 + drift + (1 - intro) * -0.5;
    g.rotation.x = 0.16 + py * 0.1 + (1 - intro) * 0.12;
    g.position.y = (reducedMotion ? 0 : Math.sin(t * 0.6) * 0.03) - (1 - intro) * 0.6;

    // Camera parallax — barely there.
    state.camera.position.x = damp(state.camera.position.x, 4.4 + px * 0.45, 2.5, dt);
    state.camera.position.y = damp(state.camera.position.y, 2.1 - py * 0.3, 2.5, dt);
    state.camera.lookAt(0.8, -0.25, 0.2);

    // Highlight
    (Object.keys(parts) as PartId[]).forEach((id) => {
      const target = active === id ? 0.22 : 0;
      parts[id].forEach((m) => {
        m.emissiveIntensity = damp(m.emissiveIntensity, target, 6, dt);
      });
    });
  });

  const [teeMat] = parts.tee;
  const [valveCast, valveBrass, valveSteel] = parts.valve;
  const [unionSteel, unionCast] = parts.union;
  const [elbowMat] = parts.elbow;
  const [flangeSteel, flangeCast] = parts.flange;

  return (
    <group ref={group}>
      {/* Pipe runs */}
      <Pipe axis="x" from={-7.5} to={-1.98} at={[0, 0]} material={pipe} radial={radial} />
      <Pipe axis="x" from={-1.52} to={-0.5} at={[0, 0]} material={pipe} radial={radial} />
      <Pipe axis="x" from={0.5} to={1.22} at={[0, 0]} material={pipe} radial={radial} />
      <Pipe axis="x" from={2.58} to={3.3} at={[0, 0]} material={pipe} radial={radial} />
      <Pipe axis="y" from={0.6} to={7.5} at={[3.92, 0]} material={pipe} radial={radial} />
      <Pipe axis="y" from={-0.5} to={-1.2} at={[0, 0]} material={pipe} radial={radial} />
      <Pipe axis="z" from={0.62} to={1.84} at={[0, -1.82]} material={pipe} radial={radial} />

      {/* Tee */}
      <group {...hoverHandlers("tee", onHover)}>
        <mesh geometry={geo.teeRun} rotation={axisRotation.x} material={teeMat} />
        <mesh geometry={geo.teeBranch} position={[0, -0.25, 0]} material={teeMat} />
        <mesh geometry={geo.teeHub} material={teeMat} scale={[1, 1, 1]} />
        <mesh geometry={geo.collarLong} position={[-0.5, 0, 0]} rotation={axisRotation.x} material={teeMat} />
        <mesh geometry={geo.collarLong} position={[0.5, 0, 0]} rotation={axisRotation.x} material={teeMat} />
        <mesh geometry={geo.collarLong} position={[0, -0.5, 0]} material={teeMat} />
      </group>

      {/* Union coupling */}
      <group position={[-1.75, 0, 0]} rotation={axisRotation.x} {...hoverHandlers("union", onHover)}>
        <mesh geometry={geo.unionBody} material={unionSteel} />
        <mesh geometry={geo.unionNut} material={unionCast} />
        <mesh geometry={geo.collarShort} position={[0, -0.25, 0]} material={unionSteel} />
        <mesh geometry={geo.collarShort} position={[0, 0.25, 0]} material={unionSteel} />
      </group>

      {/* Gate valve with flanges */}
      <group position={[1.9, 0, 0]} {...hoverHandlers("valve", onHover)}>
        <mesh geometry={geo.valveBody} rotation={axisRotation.x} material={valveCast} />
        <group rotation={[0, 0, -HALF_PI]} position={[-0.56, 0, 0]}>
          <mesh geometry={geo.flange} material={valveSteel} />
          <Bolts radius={R * 1.78} count={8} material={valveCast} radial={radial} />
        </group>
        <group rotation={[0, 0, HALF_PI]} position={[0.56, 0, 0]}>
          <mesh geometry={geo.flange} material={valveSteel} />
          <Bolts radius={R * 1.78} count={8} material={valveCast} radial={radial} />
        </group>
        {/* Bonnet, stem, handwheel */}
        <mesh position={[0, 0.62, 0]} material={valveCast}>
          <cylinderGeometry args={[0.2, 0.3, 0.5, radial]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={valveSteel}>
          <cylinderGeometry args={[0.34, 0.34, 0.08, radial]} />
        </mesh>
        <mesh position={[0, 1.22, 0]} material={valveSteel}>
          <cylinderGeometry args={[0.034, 0.034, 0.6, 12]} />
        </mesh>
        <group position={[0, 1.38, 0]}>
          <mesh rotation={[HALF_PI, 0, 0]} material={valveBrass}>
            <torusGeometry args={[0.5, 0.038, 16, tubular]} />
          </mesh>
          <mesh material={valveBrass}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 24]} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, (i / 3) * Math.PI, HALF_PI]} material={valveBrass}>
              <cylinderGeometry args={[0.02, 0.02, 1.0, 8]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Elbows */}
      <group {...hoverHandlers("elbow", onHover)}>
        <mesh geometry={geo.elbow} position={[3.3, 0.62, 0]} rotation={[0, 0, -HALF_PI]} material={elbowMat} />
        <mesh geometry={geo.collarShort} position={[3.3, 0, 0]} rotation={axisRotation.x} material={elbowMat} />
        <mesh geometry={geo.collarShort} position={[3.92, 0.62, 0]} material={elbowMat} />
        <group position={[0, -1.2, 0.62]} rotation={[0, HALF_PI, 0]}>
          <mesh geometry={geo.elbow} rotation={[0, 0, -HALF_PI]} material={elbowMat} />
        </group>
        <mesh geometry={geo.collarShort} position={[0, -1.2, 0]} material={elbowMat} />
        <mesh geometry={geo.collarShort} position={[0, -1.82, 0.62]} rotation={axisRotation.z} material={elbowMat} />
      </group>

      {/* Flanged outlet facing the viewer */}
      <group position={[0, -1.82, 1.9]} rotation={axisRotation.z} {...hoverHandlers("flange", onHover)}>
        <mesh geometry={geo.flange} material={flangeSteel} />
        <Bolts radius={R * 1.78} count={8} material={flangeCast} radial={radial} />
        <mesh position={[0, 0.075, 0]} material={flangeCast}>
          <cylinderGeometry args={[R * 2.0, R * 2.0, 0.03, radial]} />
        </mesh>
      </group>
    </group>
  );
}

function Lighting({ reducedMotion }: { reducedMotion: boolean }) {
  const key = useRef<THREE.DirectionalLight>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!key.current || reducedMotion) return;
    const dt = Math.min(delta, 1 / 30);
    key.current.position.x = damp(key.current.position.x, 2 + pointer.current.x * 7, 1.6, dt);
    key.current.position.y = damp(key.current.position.y, 5 - pointer.current.y * 3, 1.6, dt);
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight ref={key} position={[2, 5, 6]} intensity={1.6} color="#f3eee4" />
      <directionalLight position={[-6, -2, -4]} intensity={0.5} color="#6f98c4" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 6, 3]} rotation-x={HALF_PI} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-7, 1, 2]} rotation-y={HALF_PI} scale={[3, 10, 1]} />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#9fbad6"
          position={[7, 0, -2]}
          rotation-y={-HALF_PI}
          scale={[2, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.7}
          color="#d9c49a"
          position={[2, -4, 6]}
          rotation-x={-HALF_PI / 2}
          scale={[6, 1.5, 1]}
        />
      </Environment>
    </>
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

export default function PipeJunctionScene({ active, onHover, quality, running, reducedMotion, onReady }: SceneProps) {
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.35]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 26, position: [4.4, 2.1, 13.5], near: 0.1, far: 60 }}
      onPointerMissed={() => onHover(null)}
      style={{ touchAction: "pan-y" }}
    >
      <Lighting reducedMotion={reducedMotion} />
      <Assembly active={active} onHover={onHover} quality={quality} reducedMotion={reducedMotion} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
