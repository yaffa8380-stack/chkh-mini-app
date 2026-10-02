import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, PROJECT } from "../config/site";
import type { Language, Translation } from "../i18n/translations";
import { Brand } from "./Brand";
import { LaunchButton } from "./Actions";
import { Icon } from "./Icon";
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  t: Translation;
  language: Language;
  setLanguage: (language: Language) => void;
  activeSection: string;
}

export function Header({ t, language, setLanguage, activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const header = toggleRef.current?.closest("header");
        const controls = Array.from(header?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select') ?? []).filter((element) => element.offsetParent !== null);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const media = window.matchMedia("(min-width: 1280px)");
    const handleResize = () => { if (media.matches) setMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    media.addEventListener("change", handleResize);
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      media.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  return <>
    <a href="#main" className="skip-link">{t.common.skip}</a>
    <header className={`site-header ${activeSection !== "accueil" ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="header-inner">
        <a className="brand-link" href="#accueil" aria-label={`${t.nav.home} - ${PROJECT.name}`} onClick={() => setMenuOpen(false)}><Brand /></a>
        <nav className="desktop-nav" aria-label={t.footer.explore}>{NAV_ITEMS.filter((item) => item.header).map((item) => <a key={item.id} className={activeSection === item.id ? "is-active" : ""} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined}>{t.nav[item.key]}</a>)}</nav>
        <div className="header-actions">
          <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
          <LaunchButton t={t} className="button button-primary header-launch" />
          <button ref={toggleRef} className={`menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" aria-label={menuOpen ? t.common.menuClose : t.common.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
        </div>
      </div>
      <nav ref={navRef} className={`mobile-nav ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-label={t.footer.explore} inert={!menuOpen}>{NAV_ITEMS.map((item, index) => <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "is-active" : ""} onClick={() => setMenuOpen(false)}><span className="mobile-nav-number">{String(index + 1).padStart(2, "0")}</span>{t.nav[item.key]}<Icon name="arrowUpRight" /></a>)}<LaunchButton t={t} /></nav>
    </header>
    {menuOpen && <button type="button" tabIndex={-1} className="mobile-backdrop" aria-label={t.common.menuClose} onClick={() => setMenuOpen(false)} />}
  </>;
}