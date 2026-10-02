import { COMMUNITY_LINKS, getSiteLink } from "../config/site";
import type { Translation } from "../i18n/translations";
import { ExternalLink } from "./Actions";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function CommunityLinks({ t }: { t: Translation }) {
  const links = COMMUNITY_LINKS.filter((item) => getSiteLink(item.key));
  const primary = links.filter((item) => item.primary);
  const additional = links.filter((item) => !item.primary);
  if (!links.length) return <p className="community-empty"><Icon name="info" /><span>{t.community.empty}</span></p>;

  return <>
    <div className="community-grid">{primary.map((item, index) => {
      if (!item.primary) return null;
      const content = t.community.cards[item.key];
      return <Reveal key={item.key} delay={index * 100}><article className="community-card">
        <Icon name={item.icon} width="30" height="30" /><h3>{t.community.links[item.key]}</h3><p>{content.description}</p>
        <ExternalLink link={item.key} t={t} className="button button-secondary">{content.action}<Icon name="arrowUpRight" width="16" height="16" /></ExternalLink>
      </article></Reveal>;
    })}</div>
    {additional.length > 0 && <Reveal delay={100}><div className="community-links">{additional.map((item) => <ExternalLink key={item.key} link={item.key} t={t} className="community-link"><Icon name={item.icon} /><span>{t.community.links[item.key]}</span><Icon name="arrowUpRight" width="16" height="16" /></ExternalLink>)}</div></Reveal>}
  </>;
}