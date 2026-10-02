import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}