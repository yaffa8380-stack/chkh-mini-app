import { useEffect, useState } from "react";
import { PROJECT, TOKENOMICS_CONFIG, type AllocationId } from "../config/site";
import type { Language, Translation } from "../i18n/translations";
import { useInView } from "../hooks/useInView";
import { formatNumber } from "../utils/format";
import { Icon } from "./Icon";

export function TokenomicsChart({ language, t }: { language: Language; t: Translation }) {
  const { ref, visible } = useInView();
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<AllocationId>(TOKENOMICS_CONFIG.allocations[0].id);
  const active = TOKENOMICS_CONFIG.allocations.find((item) => item.id === selected)!;
  const circumference = 2 * Math.PI * 142;
  const totalPercent = TOKENOMICS_CONFIG.allocations.reduce((sum, item) => sum + item.percent, 0);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(1); return; }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / 1400, 1);
      setProgress(1 - (1 - elapsed) ** 3);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  let offset = 0;
  return <div ref={ref} className={`tokenomics-layout reveal ${visible ? "is-visible" : ""}`}>
    <div className="chart-column">
      <div className="donut-chart">
        <svg viewBox="0 0 360 360" role="group" aria-label={t.tokenomics.chartLabel}><circle cx="180" cy="180" r="142" fill="none" stroke="#132037" strokeWidth="31" /><circle cx="180" cy="180" r="112" fill="none" stroke="#172339" strokeWidth="1" strokeDasharray="2 6" />{TOKENOMICS_CONFIG.allocations.map((item) => {
          const startOffset = offset;
          offset += item.percent / 100 * circumference;
          return <circle key={item.id} className={`chart-segment ${selected === item.id ? "is-selected" : ""}`} cx="180" cy="180" r="142" fill="none" stroke={item.color} strokeWidth="31" strokeDasharray={`${(item.percent / 100 * circumference - 8) * progress} ${circumference}`} strokeDashoffset={-startOffset - 4} transform="rotate(-90 180 180)" role="button" tabIndex={0} aria-label={`${t.tokenomics.labels[item.id]} : ${item.percent}%`} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(item.id); } }} />;
        })}</svg>
        <div className="chart-center" aria-live="polite"><span className="chart-center-label">{t.tokenomics.labels[active.id]}</span><strong aria-hidden="true">{Math.round(active.percent * progress)}<span>%</span></strong><span className="sr-only">{active.percent}%</span><span className="chart-center-amount">{formatNumber(PROJECT.totalSupply * active.percent / 100, language)} {PROJECT.symbol}</span></div>
      </div>
      <div className="chart-supply"><span>{t.common.totalSupply}</span><strong>{formatNumber(PROJECT.totalSupply, language)} <span>{PROJECT.symbol}</span></strong></div>
    </div>
    <div className="allocation-column">
      <div className="allocation-heading"><span className="small-label">{TOKENOMICS_CONFIG.distributionConfirmed ? t.tokenomics.confirmed : t.tokenomics.proposed}</span><Icon name="layers" /></div>
      <div className="allocation-list">{TOKENOMICS_CONFIG.allocations.map((item) => <button type="button" key={item.id} className={`allocation-row ${selected === item.id ? "is-selected" : ""}`} aria-label={`${t.tokenomics.labels[item.id]} : ${item.percent}%, ${formatNumber(PROJECT.totalSupply * item.percent / 100, language)} ${PROJECT.symbol}`} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span className="allocation-dot" style={{ background: item.color }} /><span className="allocation-text"><span className="allocation-name">{t.tokenomics.labels[item.id]}</span><bdi className="allocation-quantity">{formatNumber(PROJECT.totalSupply * item.percent / 100, language)} {PROJECT.symbol}</bdi></span><strong aria-hidden="true">{Math.round(item.percent * progress)}<span>%</span></strong></button>)}</div>
      <div className="allocation-total"><span>{t.common.total}</span><bdi>{formatNumber(PROJECT.totalSupply * totalPercent / 100, language)} {PROJECT.symbol}</bdi><strong>{totalPercent}%</strong></div>
      <div className="allocation-details" aria-live="polite"><span className="small-label">{t.tokenomics.labels[active.id]}</span><p>{t.tokenomics.descriptions[active.id]}</p></div>
      <p className="allocation-note"><Icon name="info" /><span>{TOKENOMICS_CONFIG.distributionConfirmed ? t.tokenomics.confirmedNote : t.tokenomics.note}</span></p>
    </div>
  </div>;
}