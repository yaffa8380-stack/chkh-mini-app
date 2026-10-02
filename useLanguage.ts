import { useEffect, useState } from "react";
import { LANGUAGE_OPTIONS, translations, type Language } from "../i18n/translations";
import { FAQ_ITEMS, getSiteLink, LANGUAGE_CONFIG, PROJECT } from "../config/site";
import { languageUrl } from "../seo/urls";
import { getFaqAnswer, getFaqQuestion } from "../components/FAQ";

function initialLanguage(): Language {
  try {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (LANGUAGE_OPTIONS.some((option) => option.code === query)) return query as Language;
    const stored = localStorage.getItem("cheikh-language");
    if (LANGUAGE_OPTIONS.some((option) => option.code === stored)) return stored as Language;
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
  return LANGUAGE_CONFIG.defaultLanguage;
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = LANGUAGE_OPTIONS.find((option) => option.code === language)?.direction ?? "ltr";
    if (language === "ar" && !document.getElementById("cheikh-arabic-font")) {
      const font = document.createElement("link");
      font.id = "cheikh-arabic-font";
      font.rel = "stylesheet";
      font.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600&display=swap";
      document.head.appendChild(font);
    }
    document.title = t.seo.title;
    try { localStorage.setItem("cheikh-language", language); } catch { /* Storage is optional. */ }
    const currentUrl = new URL(window.location.href);
    if (language === LANGUAGE_CONFIG.defaultLanguage) currentUrl.searchParams.delete("lang");
    else currentUrl.searchParams.set("lang", language);
    try { window.history.replaceState(window.history.state, "", currentUrl.href); } catch { /* Some embedded browsers restrict history changes. */ }

    const updateMeta = (attribute: "name" | "property", name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    updateMeta("name", "description", t.seo.description);
    updateMeta("property", "og:title", t.seo.title);
    updateMeta("property", "og:description", t.seo.description);
    updateMeta("property", "og:locale", t.seo.locale);
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((element) => element.remove());
    LANGUAGE_OPTIONS.filter((option) => option.code !== language).forEach((option) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.content = option.locale;
      document.head.appendChild(meta);
    });
    updateMeta("name", "twitter:title", t.seo.title);
    updateMeta("name", "twitter:description", t.seo.description);
    updateMeta("property", "og:image:alt", t.hero.imageAlt);
    updateMeta("name", "twitter:image:alt", t.hero.imageAlt);
    const siteOrigin = getSiteLink("website") ?? window.location.origin;
    const siteUrl = languageUrl(siteOrigin, language);
    updateMeta("property", "og:url", siteUrl);
    const imageUrl = new URL(PROJECT.heroImage, siteOrigin).href;
    updateMeta("property", "og:image", imageUrl);
    updateMeta("name", "twitter:image", imageUrl);
    document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.setAttribute("href", PROJECT.originalLogo);
    document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]')?.setAttribute("href", PROJECT.originalLogo);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    LANGUAGE_OPTIONS.forEach((option) => {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = option.code;
      alternate.href = languageUrl(siteOrigin, option.code);
      document.head.appendChild(alternate);
    });
    const defaultAlternate = document.createElement("link");
    defaultAlternate.rel = "alternate";
    defaultAlternate.hreflang = "x-default";
    defaultAlternate.href = languageUrl(siteOrigin, LANGUAGE_CONFIG.defaultLanguage);
    document.head.appendChild(defaultAlternate);

    let structured = document.getElementById("cheikh-structured-data");
    if (!structured) {
      structured = document.createElement("script");
      structured.id = "cheikh-structured-data";
      structured.setAttribute("type", "application/ld+json");
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: PROJECT.name, url: siteUrl, description: t.seo.description, inLanguage: language },
        { "@type": "FAQPage", inLanguage: language, mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question", name: getFaqQuestion(item, t, language),
          acceptedAnswer: { "@type": "Answer", text: getFaqAnswer(item, t, language) },
        })) },
      ],
    });
  }, [language, t]);

  return { language, setLanguage, t };
}