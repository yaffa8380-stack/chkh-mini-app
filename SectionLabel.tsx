export function SectionLabel({ number, children }: { number: string; children: string }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" /><span>{children}</span></div>;
}