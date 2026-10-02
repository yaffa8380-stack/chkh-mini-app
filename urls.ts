import { LANGUAGE_CONFIG } from "../config/site.js";
import type { Language } from "../i18n/translations";

export function languageUrl(base: string, language: Language) {
  const url = new URL("/", base);
  if (language !== LANGUAGE_CONFIG.defaultLanguage) url.searchParams.set("lang", language);
  return url.href;
}

export function safeWebsiteOrigin(value: string) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return undefined;
    return url.origin;
  } catch { return undefined; }
}