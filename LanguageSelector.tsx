import { useId } from "react";
import { LANGUAGE_OPTIONS, type Language, type Translation } from "../i18n/translations";
import { Icon } from "./Icon";

export function LanguageSelector({ language, setLanguage, t }: { language: Language; setLanguage: (language: Language) => void; t: Translation }) {
  const id = useId();
  return <div className="language-select">
    <label className="sr-only" htmlFor={id}>{t.common.language}</label>
    <Icon name="globe" width="15" height="15" />
    <select id={id} value={language} onChange={(event) => {
      const value = event.target.value;
      if (LANGUAGE_OPTIONS.some((option) => option.code === value)) setLanguage(value as Language);
    }}>
      {LANGUAGE_OPTIONS.map((option) => <option key={option.code} value={option.code} lang={option.code}>{option.flag} {option.name}</option>)}
    </select>
  </div>;
}