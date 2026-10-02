import { useEffect, useState, type ReactNode } from "react";
import { getSiteLink, PROJECT, type SiteLink } from "../config/site";
import type { Translation } from "../i18n/translations";
import { Icon } from "./Icon";

export function ExternalLink({ link, children, className = "", t }: { link: SiteLink; children: ReactNode; className?: string; t: Translation }) {
  const href = getSiteLink(link);
  if (!href) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> ({t.common.external})</span></a>;
}

export function LaunchButton({ t, className = "button button-primary", label, link = "telegramBot" }: { t: Translation; className?: string; label?: string; link?: "telegramBot" | "miniApp" }) {
  return <ExternalLink t={t} link={link} className={className}>{label ?? (link === "telegramBot" ? t.common.startMining : t.common.launch)}<Icon name="arrowUpRight" /></ExternalLink>;
}

export function CopyButton({ t, showText = false, className = "" }: { t: Translation; showText?: boolean; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2800);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROJECT.contract);
      } else {
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const textarea = document.createElement("textarea");
        textarea.value = PROJECT.contract;
        textarea.readOnly = true;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        previousFocus?.focus({ preventScroll: true });
        if (!copied) throw new Error("Clipboard is unavailable");
      }
      setStatus("copied");
    } catch { setStatus("error"); }
  }

  const label = status === "copied" ? t.common.copied : t.common.copy;
  return <span className={`copy-control ${className}`}>
    <button type="button" className={`copy-button ${status === "copied" ? "is-copied" : ""}`} aria-label={label} title={label} onClick={copy}><Icon name={status === "copied" ? "check" : "copy"} />{showText && <span>{label}</span>}</button>
    <span className={status === "error" || (status === "copied" && !showText) ? "copy-feedback" : "sr-only"} aria-live="polite">{status === "copied" ? t.common.copied : status === "error" ? t.common.copyFailed : ""}</span>
  </span>;
}