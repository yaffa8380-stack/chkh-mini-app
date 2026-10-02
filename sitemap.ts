import { LANGUAGE_CONFIG } from "../config/site.js";
import { languageUrl, safeWebsiteOrigin } from "./urls.js";

export function buildSitemap(base: string) {
  const origin = safeWebsiteOrigin(base);
  if (!origin) return undefined;
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const alternates = LANGUAGE_CONFIG.supportedLanguages.map((language) => `<xhtml:link rel="alternate" hreflang="${language.code}" href="${escape(languageUrl(origin, language.code))}"/>`).join("");
  const defaultAlternate = `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(languageUrl(origin, LANGUAGE_CONFIG.defaultLanguage))}"/>`;
  const entries = LANGUAGE_CONFIG.supportedLanguages.map((language) => `<url><loc>${escape(languageUrl(origin, language.code))}</loc>${alternates}${defaultAlternate}</url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>`;
}