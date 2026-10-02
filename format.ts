import type { Language } from "../i18n/translations";

const formatters = new Map<Language, Intl.NumberFormat>();

export function formatNumber(value: number, language: Language) {
  if (!formatters.has(language)) {
    formatters.set(language, new Intl.NumberFormat(language, { maximumFractionDigits: 0 }));
  }
  return formatters.get(language)!.format(value);
}