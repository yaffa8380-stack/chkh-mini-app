import { useEffect, useId, useRef } from "react";
import type { Translation } from "../i18n/translations";
import { ABOUT_ITEMS, ECOSYSTEM_ITEMS } from "../config/site";
import { ExternalLink } from "./Actions";
import { Icon } from "./Icon";

export type DialogMode = "app" | (typeof ECOSYSTEM_ITEMS)[number]["id"] | `about-${(typeof ABOUT_ITEMS)[number]["id"]}`;

export function InfoDialog({ mode, t, onClose }: { mode: DialogMode; t: Translation; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const about = ABOUT_ITEMS.find((entry) => `about-${entry.id}` === mode);
  const ecosystem = ECOSYSTEM_ITEMS.find((entry) => entry.id === mode);
  const item = about ? t.token.items[about.id] : ecosystem ? t.ecosystem.items[ecosystem.id] : undefined;
  const isApp = !item;
  const icon = about?.icon ?? ecosystem?.icon ?? "rocket";

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && !previousFocus.closest("[inert]")) {
        previousFocus.focus({ preventScroll: true });
      } else {
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus({ preventScroll: true });
      }
    };
  }, []);

  return <dialog ref={dialogRef} className="info-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="dialog-content">
    <button type="button" className="dialog-close" aria-label={t.common.close} onClick={onClose} autoFocus><Icon name="close" /></button>
    <span className="dialog-icon"><Icon name={icon} width="32" height="32" /></span><h2 id={titleId}>{item?.title ?? t.modal.title}</h2><p id={descriptionId}>{item?.detail ?? t.modal.description}</p>
    <p className="dialog-note"><Icon name={isApp ? "shield" : "info"} /><span>{isApp ? t.modal.safety : t.ecosystem.availability}</span></p>
    <div className="dialog-actions"><ExternalLink link="tonviewer" t={t} className="button button-primary">{t.common.verify}<Icon name="arrowUpRight" /></ExternalLink><button type="button" className="button button-secondary" onClick={onClose}>{t.common.close}</button></div>
  </div></dialog>;
}