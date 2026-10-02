import { PROJECT, TOKEN_CONFIG } from "../config/site";
import type { Language } from "../i18n/translations";
import { formatNumber } from "./format";

export function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}

export function projectValues(language: Language) {
  return {
    projectName: PROJECT.name, symbol: PROJECT.symbol, network: PROJECT.network,
    supply: formatNumber(PROJECT.totalSupply, language), bot: PROJECT.botUsername,
    contract: PROJECT.contract, explorerSymbol: TOKEN_CONFIG.explorerSymbol,
  };
}