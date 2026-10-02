import { useEffect, useState } from "react";
import { ABOUT_ITEMS, ECOSYSTEM_ITEMS, HOW_STEPS, NAV_ITEMS, PROJECT, ROADMAP_CONFIG, SITE_CONFIG } from "./config/site";
import { useLanguage } from "./hooks/useLanguage";
import { formatNumber } from "./utils/format";
import { Header } from "./components/Header";
import { Brand, TokenLogo } from "./components/Brand";
import { Icon } from "./components/Icon";
import { CopyButton, ExternalLink, LaunchButton } from "./components/Actions";
import { Reveal } from "./components/Reveal";
import { TokenomicsChart } from "./components/Tokenomics";
import { InfoDialog, type DialogMode } from "./components/InfoDialog";
import { SectionLabel } from "./components/SectionLabel";
import { CommunityLinks } from "./components/Community";
import { FAQ } from "./components/FAQ";
import { interpolate, projectValues } from "./utils/interpolate";

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("accueil");
  const [dialog, setDialog] = useState<DialogMode | null>(null);
  const supply = formatNumber(PROJECT.totalSupply, language);
  const sloganWords = PROJECT.slogan.split(" ");
  const values = projectValues(language);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }
    }, { rootMargin: "-12% 0px -62% 0px", threshold: 0 });
    NAV_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return <>
    <Header t={t} language={language} setLanguage={setLanguage} activeSection={activeSection} />
    <main id="main" tabIndex={-1}>
      <section id="accueil" className="hero" aria-labelledby="hero-title">
        <div className="hero-visual">
          <img className="hero-image" src={PROJECT.heroImage} alt={t.hero.imageAlt} fetchPriority="high" width="1536" height="1024" />
          <div className="hero-image-shade" />
        </div>
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span /><bdi className="hero-symbol">{PROJECT.symbol}</bdi>{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero-title" dir="ltr">{PROJECT.name.slice(0, -1)}<span>$</span></h1>
            <p className="hero-slogan" dir="ltr">{sloganWords.slice(0, 2).join(" ")} <span>{sloganWords[2]}</span></p>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-buttons">
              <LaunchButton t={t} />
              <ExternalLink t={t} link="telegramOfficial" className="button button-secondary"><Icon name="telegram" />{t.common.joinTelegram}</ExternalLink>
              <ExternalLink t={t} link="buyToken" className="button button-secondary">{interpolate(t.common.buyToken, values)}<Icon name="arrowUpRight" /></ExternalLink>
            </div>
            <div className="hero-token-info">
              <span><Icon name="ton" />{t.hero.network} <strong>{PROJECT.network}</strong></span>
              <span className="info-separator" /><span>{supply} <strong>{PROJECT.symbol}</strong></span>
            </div>
          </div>
          <a className="hero-scroll" href="#chkh"><span className="scroll-icon"><Icon name="arrowDown" width="14" height="18" /></span>{t.hero.scroll}</a>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section id="chkh" className="container section token-section" aria-labelledby="token-title">
        <Reveal className="token-copy">
          <SectionLabel number="01">{t.token.eyebrow}</SectionLabel>
          <h2 id="token-title">{t.token.title}</h2>
          <p className="section-description">{t.token.description}</p>
          <ExternalLink t={t} link="tonviewer" className="text-link">{t.common.tonviewer}<Icon name="arrowUpRight" /></ExternalLink>
        </Reveal>
        <Reveal delay={120} className="token-card-wrap">
          <div className="token-card">
            <div className="token-card-heading">
              <TokenLogo size={58} lazy />
              <div><h3>{PROJECT.name}</h3><p>{t.token.cardSubtitle}</p></div>
              <ExternalLink t={t} link="tonviewer" className="token-card-external"><Icon name="arrowUpRight" /><span className="sr-only">{t.common.tonviewer}</span></ExternalLink>
            </div>
            <dl className="token-properties">
              <div><dt>{t.common.name}</dt><dd><bdi>{PROJECT.name}</bdi></dd></div>
              <div><dt>{t.common.symbol}</dt><dd><bdi>{PROJECT.symbol}</bdi></dd></div>
              <div><dt>{t.common.network}</dt><dd className="network-value"><Icon name="ton" />{PROJECT.network}</dd></div>
              <div><dt>{t.common.totalSupply}</dt><dd><bdi>{supply} {PROJECT.symbol}</bdi></dd></div>
            </dl>
            <div className="token-card-contract"><span>{t.common.contract}</span><code dir="ltr" title={PROJECT.contract}>{PROJECT.contract.slice(0, 8)}...{PROJECT.contract.slice(-7)}</code><CopyButton t={t} /></div>
          </div>
        </Reveal>
        <div className="about-grid">{ABOUT_ITEMS.map((item, index) => <Reveal key={item.id} delay={index * 90}><article className="ecosystem-card about-card"><Icon name={item.icon} width="28" height="28" /><h3>{t.token.items[item.id].title}</h3><p>{t.token.items[item.id].description}</p><button type="button" className="text-link ecosystem-more" aria-haspopup="dialog" aria-label={`${t.common.learnMore} : ${t.token.items[item.id].title}`} onClick={() => setDialog(`about-${item.id}`)}>{t.common.learnMore}<Icon name="arrowUpRight" width="17" height="17" /></button></article></Reveal>)}</div>
      </section>

      <section id="tokenomics" className="section tokenomics-section" aria-labelledby="tokenomics-title">
        <div className="container">
          <Reveal className="section-intro"><SectionLabel number="02">{t.tokenomics.eyebrow}</SectionLabel><h2 id="tokenomics-title">{t.tokenomics.title}<span className="heading-period">.</span></h2><p className="section-description">{t.tokenomics.description}</p></Reveal>
          <TokenomicsChart language={language} t={t} />
          <Reveal><p className="tokenomics-policy">{t.tokenomics.policy}</p></Reveal>
        </div>
      </section>

      <section id="ecosysteme" className="container section ecosystem-section" aria-labelledby="ecosystem-title">
        <Reveal className="section-intro"><SectionLabel number="03">{t.ecosystem.eyebrow}</SectionLabel><h2 id="ecosystem-title">{t.ecosystem.title}</h2><p className="section-description">{t.ecosystem.description}</p></Reveal>
        <div className="ecosystem-grid">
          {ECOSYSTEM_ITEMS.map((item, index) => <Reveal key={item.id} delay={index * 90}>
            <article className="ecosystem-card">
              <div className="ecosystem-card-top"><Icon name={item.icon} width="31" height="31" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{t.ecosystem.items[item.id].title}</h3><p>{t.ecosystem.items[item.id].description}</p>
              <button type="button" className="text-link ecosystem-more" onClick={() => setDialog(item.id)} aria-haspopup="dialog" aria-label={`${t.common.learnMore} : ${t.ecosystem.items[item.id].title}`}>{t.common.learnMore}<Icon name="arrowUpRight" width="17" height="17" /></button>
            </article>
          </Reveal>)}
        </div>
      </section>

      <section id="fonctionnement" className="container section how-section" aria-labelledby="how-title">
        <Reveal><SectionLabel number="04">{t.how.eyebrow}</SectionLabel><h2 id="how-title">{t.how.title}</h2><p className="section-description">{t.how.description}</p></Reveal>
        <div className="how-steps">{HOW_STEPS.map((step, index) => <Reveal key={step} delay={index * 90}><div className="how-step"><span className="how-number">{String(index + 1).padStart(2, "0")}</span><h3>{t.how.steps[step].title}</h3><p>{t.how.steps[step].description}</p></div></Reveal>)}</div>
        <Reveal><LaunchButton t={t} /><ExternalLink t={t} link="telegramBot" className="how-bot"><bdi>{PROJECT.botUsername}</bdi><Icon name="arrowUpRight" width="14" height="14" /></ExternalLink></Reveal>
      </section>

      <section id="roadmap" className="section roadmap-section" aria-labelledby="roadmap-title">
        <div className="container">
          <Reveal className="section-intro"><SectionLabel number="05">{t.roadmap.eyebrow}</SectionLabel><div className="roadmap-title-row"><h2 id="roadmap-title">{t.roadmap.title}</h2><span className="roadmap-word">{t.nav.roadmap}</span></div><p className="section-description">{t.roadmap.description}</p></Reveal>
          <div className="roadmap-timeline">
            {ROADMAP_CONFIG.phases.map((phase, index) => <Reveal key={phase.id} delay={index * 120} className={`roadmap-phase status-${phase.status}`}>
              <div className="phase-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="phase-content"><div className="phase-meta"><span>{t.roadmap.phase} {index + 1}</span><span className="phase-status">{t.roadmap.status[phase.status]}</span></div><h3>{t.roadmap.phases[phase.id].title}</h3><ul>{t.roadmap.phases[phase.id].items.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </Reveal>)}
          </div>
          <Reveal><p className="roadmap-note"><Icon name="info" />{t.roadmap.note}</p></Reveal>
        </div>
      </section>

      <section id="verifier" className="section verification-section" aria-labelledby="verify-title">
        <div className="container verification-inner">
          <Reveal><SectionLabel number="06">{t.verify.eyebrow}</SectionLabel><h2 id="verify-title">{t.verify.title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2><p className="section-description">{t.verify.description}</p></Reveal>
          <Reveal delay={80}><dl className="transparency-facts"><div><dt>{t.common.network}</dt><dd><bdi>{PROJECT.network}</bdi></dd></div><div><dt>{t.common.name}</dt><dd><bdi>{PROJECT.name}</bdi></dd></div><div><dt>{t.common.symbol}</dt><dd><bdi>{PROJECT.symbol}</bdi></dd></div><div><dt>{t.common.totalSupply}</dt><dd><bdi>{supply}</bdi></dd></div></dl></Reveal>
          <Reveal delay={120} className="contract-verification">
            <div className="contract-label"><Icon name="ton" /><span>{t.common.contract}</span><span className="contract-network">{PROJECT.network}</span></div>
            <div className="contract-address"><code dir="ltr">{PROJECT.contract}</code></div>
            <div className="verify-buttons"><ExternalLink t={t} link="tonviewer" className="button button-primary"><Icon name="search" />{t.common.tonviewer}<Icon name="arrowUpRight" /></ExternalLink><CopyButton t={t} showText className="copy-action" /><ExternalLink t={t} link="tonExplorer" className="button button-secondary"><Icon name="search" />{t.common.tonExplorer}<Icon name="arrowUpRight" /></ExternalLink></div>
          </Reveal>
          <Reveal delay={160}><p className="symbol-note">{interpolate(t.verify.symbolNote, values)}</p></Reveal>
          <Reveal delay={200}><p className="verification-warning"><Icon name="shield" /><span>{t.verify.warning}</span></p></Reveal>
        </div>
      </section>

      <section id="communaute" className="container section community-section" aria-labelledby="community-title">
        <Reveal><SectionLabel number="07">{t.community.eyebrow}</SectionLabel><h2 id="community-title">{t.community.title}</h2><p className="section-description">{t.community.description}</p></Reveal>
        <CommunityLinks t={t} />
      </section>

      <section id="faq" className="container section faq-section" aria-labelledby="faq-title">
        <Reveal><SectionLabel number="08">{t.faq.eyebrow}</SectionLabel><h2 id="faq-title">{t.faq.title}</h2><p className="section-description">{t.faq.description}</p><ExternalLink t={t} link="whitepaper" className="text-link faq-whitepaper"><Icon name="book" />{t.common.whitepaper}<Icon name="arrowUpRight" /></ExternalLink></Reveal>
        <Reveal delay={100}><FAQ t={t} language={language} /></Reveal>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand"><a href="#accueil" aria-label={`${t.nav.home} - ${PROJECT.name}`}><Brand /></a><bdi className="footer-symbol">{PROJECT.symbol}</bdi><p>{PROJECT.slogan}</p><div className="footer-social-links"><span className="small-label">{t.footer.socials}</span><ExternalLink t={t} link="x">{t.community.links.x}<Icon name="arrowUpRight" width="12" height="12" /></ExternalLink><ExternalLink t={t} link="telegramOfficial">{t.community.links.telegramOfficial}<Icon name="arrowUpRight" width="12" height="12" /></ExternalLink><ExternalLink t={t} link="telegramCommunity">{t.community.links.telegramCommunity}<Icon name="arrowUpRight" width="12" height="12" /></ExternalLink></div></div>
          <div className="footer-explore"><span className="small-label">{t.footer.explore}</span><div className="footer-links">{NAV_ITEMS.map((item) => <a key={item.id} href={`#${item.id}`}>{t.nav[item.key]}</a>)}<LaunchButton t={t} className="footer-app-link" /><LaunchButton t={t} link="miniApp" label={t.common.miniApp} className="footer-app-link" /><ExternalLink t={t} link="whitepaper">{t.common.whitepaper}</ExternalLink></div></div>
          <div className="footer-contract"><span className="small-label">{t.common.contract}</span><p className="footer-contract-identity"><bdi>{PROJECT.symbol} - {PROJECT.network}</bdi></p><div><code dir="ltr">{PROJECT.contract}</code><CopyButton t={t} /></div><ExternalLink t={t} link="tonviewer" className="text-link">{t.common.tonviewer}<Icon name="arrowUpRight" width="14" height="14" /></ExternalLink></div>
        </div>
        <p className="footer-disclaimer">{t.footer.disclaimer}</p>
        <div className="footer-bottom"><span>&copy; {SITE_CONFIG.copyrightYear} <bdi>{PROJECT.name}</bdi>. {t.footer.copyright}</span><span><Icon name="ton" width="16" height="16" />{t.footer.network}</span></div>
      </div>
    </footer>
    {dialog && <InfoDialog mode={dialog} t={t} onClose={() => setDialog(null)} />}
  </>;
}
