import { FAQ_ITEMS, getSiteLink } from "../config/site";
import type { Language, Translation } from "../i18n/translations";
import { interpolate, projectValues } from "../utils/interpolate";
import { ExternalLink } from "./Actions";
import { Icon } from "./Icon";

export function getFaqQuestion(item: (typeof FAQ_ITEMS)[number], t: Translation, language: Language) {
  return interpolate(t.faq.questions[item.id].question, projectValues(language));
}

export function getFaqAnswer(item: (typeof FAQ_ITEMS)[number], t: Translation, language: Language) {
  const hasLink = "link" in item;
  const unavailable = hasLink && !getSiteLink(item.link);
  const template = unavailable
    ? item.id === "obtain" ? t.faq.obtainUnavailable : t.modal.description
    : t.faq.questions[item.id].answer;
  return interpolate(template, projectValues(language));
}

export function FAQ({ t, language }: { t: Translation; language: Language }) {
  return <div className="faq-list">{FAQ_ITEMS.map((item) => <details key={item.id} name="cheikh-faq" className="faq-item">
    <summary><span>{getFaqQuestion(item, t, language)}</span><Icon name="plus" /></summary>
    <div className="faq-answer"><p>{getFaqAnswer(item, t, language)}</p>{"link" in item && <ExternalLink link={item.link} t={t} className="text-link">{t.faq.link}<Icon name="arrowUpRight" width="15" height="15" /></ExternalLink>}</div>
  </details>)}</div>;
}