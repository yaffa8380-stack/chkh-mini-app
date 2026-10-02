import { PROJECT } from "../config/site";

export function TokenLogo({ size = 40, lazy = false }: { size?: number; lazy?: boolean }) {
  return <img src={PROJECT.logo} width={size} height={size} alt="" loading={lazy ? "lazy" : "eager"} decoding="async" onError={(event) => {
    const image = event.currentTarget;
    if (!image.src.endsWith(PROJECT.logoFallback)) image.src = PROJECT.logoFallback;
  }} />;
}

export function Brand({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`}><TokenLogo /><span dir="ltr">{PROJECT.name}</span></span>;
}