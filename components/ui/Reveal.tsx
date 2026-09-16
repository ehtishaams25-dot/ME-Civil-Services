"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "li" | "p" | "span" | "section";
};

/** Soft fade-up on first entry into the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.25, as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: ease.expo, delay }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "ul" | "ol" | "div";
};

/** Parent for lists whose children use <StaggerItem>. */
export function Stagger({ children, className, stagger = 0.06, delay = 0, amount = 0.15, as = "ul" }: StaggerProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "li",
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
  y?: number;
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.expo } },
      }}
    >
      {children}
    </Tag>
  );
}
