// Edit official URLs here. Empty optional links are never rendered as buttons.
export const X_URL = "https://x.com/cheikhtoken?s=11";
export const TELEGRAM_OFFICIAL_URL = "https://t.me/+4jU2bP7NL1Y4MDY8";
export const TELEGRAM_COMMUNITY_URL = "https://t.me/+1Bex7CNnUX5jMjI0";
export const TELEGRAM_BOT_USERNAME = "@cheikhminer_bot";
export const TELEGRAM_BOT_URL = ""; // Optional override; otherwise derived from the username.
export const TON_CONTRACT_ADDRESS = "0:0494d83a6ed22265a643a7f72334419cf04aec7eb50cd54ceafb4b8ea604b597";
export const TON_EXPLORER_URL = "https://tonviewer.com/0:0494d83a6ed22265a643a7f72334419cf04aec7eb50cd54ceafb4b8ea604b597";
export const WEBSITE_URL = "";
export const BUY_TOKEN_URL = "";
export const DISCORD_URL = "";
export const YOUTUBE_URL = "";
export const TIKTOK_URL = "";
export const INSTAGRAM_URL = "";
export const FACEBOOK_URL = "";
export const MEDIUM_URL = "";
export const GITHUB_URL = "";
export const WHITEPAPER_URL = "";
export const MINI_APP_URL = "";
export const ADDITIONAL_TON_EXPLORER_URL = "";

function botUrl(username: string) {
  const value = username.trim().replace(/^@/, "");
  return /^[a-zA-Z0-9_]{5,32}$/.test(value) ? `https://t.me/${value}` : "";
}

export const SOCIAL_LINKS = {
  x: X_URL,
  telegramOfficial: TELEGRAM_OFFICIAL_URL,
  telegramCommunity: TELEGRAM_COMMUNITY_URL,
  telegramBot: TELEGRAM_BOT_URL || botUrl(TELEGRAM_BOT_USERNAME),
  discord: DISCORD_URL,
  youtube: YOUTUBE_URL,
  tiktok: TIKTOK_URL,
  instagram: INSTAGRAM_URL,
  facebook: FACEBOOK_URL,
  medium: MEDIUM_URL,
  github: GITHUB_URL,
};

export const TOKEN_CONFIG = {
  contractAddress: TON_CONTRACT_ADDRESS,
  friendlyAddress: "EQAElNg6btIiZaZDp_cjNEGc8ErsfrUM1Uzq-0uOpgS1lxXc",
  explorerUrl: TON_EXPLORER_URL,
  buyUrl: BUY_TOKEN_URL,
  // Observed on the supplied explorer; this is not a live data feed or endorsement.
  explorerSymbol: "CHKH",
};

export const SITE_CONFIG = {
  projectName: "CHEIKH$",
  tokenName: "CHEIKH$",
  symbol: "CHKH",
  network: "TON",
  totalSupply: 5_000_000_000,
  slogan: "Mine. Earn. Grow.",
  copyrightYear: 2026,
  website: WEBSITE_URL,
  whitepaper: WHITEPAPER_URL,
  miniApp: MINI_APP_URL,
};

export const LINK_CONFIG = {
  ...SOCIAL_LINKS,
  website: WEBSITE_URL,
  tonviewer: TON_EXPLORER_URL,
  tonExplorer: ADDITIONAL_TON_EXPLORER_URL,
  buyToken: BUY_TOKEN_URL,
  whitepaper: WHITEPAPER_URL,
  miniApp: MINI_APP_URL,
};

export type SiteLink = keyof typeof LINK_CONFIG;

export function getSiteLink(key: SiteLink): string | undefined {
  const value = LINK_CONFIG[key].trim();
  if (!value || value.startsWith("INSERER_")) return undefined;
  try {
    const url = new URL(value);
    if (url.username || url.password) return undefined;
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export const PROJECT = {
  name: SITE_CONFIG.projectName,
  symbol: SITE_CONFIG.symbol,
  tokenName: SITE_CONFIG.tokenName,
  slogan: SITE_CONFIG.slogan,
  network: SITE_CONFIG.network,
  totalSupply: SITE_CONFIG.totalSupply,
  contract: TOKEN_CONFIG.contractAddress,
  botUsername: TELEGRAM_BOT_USERNAME,
  logo: "https://cache.tonapi.io/imgproxy/y8AbBP7-ITroySw99q9gUsG7zVe8ALLMsUHdAKLV8s8/rs:fill:200:200:1/g:no/aHR0cHM6Ly9pLnBvc3RpbWcuY2MveGozNGtXR3MvQzgwQUNEQTItNjYzMi00NzY3LUFDNTUtREI2MDI2MDgxQkM1LnBuZw.webp",
  originalLogo: "https://i.postimg.cc/xj34kWGs/C80ACDA2-6632-4767-AC55-DB6026081BC5.png",
  logoFallback: "/images/cheikh-logo.svg",
  heroImage: "/images/cheikh-hero.jpg",
};

export const LANGUAGE_CONFIG = {
  defaultLanguage: "fr",
  supportedLanguages: [
    { code: "fr", label: "FR", name: "Fran\u00e7ais", flag: "\u{1F1EB}\u{1F1F7}", direction: "ltr", locale: "fr_FR" },
    { code: "en", label: "EN", name: "English", flag: "\u{1F1EC}\u{1F1E7}", direction: "ltr", locale: "en_US" },
    { code: "es", label: "ES", name: "Espa\u00f1ol", flag: "\u{1F1EA}\u{1F1F8}", direction: "ltr", locale: "es_ES" },
    { code: "ar", label: "AR", name: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\u{1F1F8}\u{1F1E6}", direction: "rtl", locale: "ar_SA" },
    { code: "ru", label: "RU", name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\u{1F1F7}\u{1F1FA}", direction: "ltr", locale: "ru_RU" },
  ],
} as const;

export const NAV_ITEMS = [
  { key: "home", id: "accueil", header: true },
  { key: "token", id: "chkh", header: true },
  { key: "tokenomics", id: "tokenomics", header: true },
  { key: "ecosystem", id: "ecosysteme", header: false },
  { key: "how", id: "fonctionnement", header: false },
  { key: "roadmap", id: "roadmap", header: true },
  { key: "verify", id: "verifier", header: true },
  { key: "community", id: "communaute", header: true },
  { key: "faq", id: "faq", header: false },
] as const;

export const TOKENOMICS_CONFIG = {
  distributionConfirmed: false,
  allocations: [
    { id: "community", percent: 40, color: "#2580ff" },
    { id: "referral", percent: 15, color: "#36c9ef" },
    { id: "liquidity", percent: 15, color: "#6863ee" },
    { id: "development", percent: 10, color: "#a5a9fa" },
    { id: "marketing", percent: 5, color: "#70acd7" },
    { id: "reserve", percent: 10, color: "#284e99" },
    { id: "team", percent: 5, color: "#66768e" },
  ],
} as const;

export type AllocationId = (typeof TOKENOMICS_CONFIG.allocations)[number]["id"];
export type RoadmapStatus = "COMPLETED" | "IN_PROGRESS" | "UPCOMING";
export type RoadmapPhaseId = "foundation" | "community" | "ecosystem" | "growth";

export const ROADMAP_CONFIG: { phases: { id: RoadmapPhaseId; status: RoadmapStatus }[] } = {
  phases: [
    { id: "foundation", status: "UPCOMING" },
    { id: "community", status: "UPCOMING" },
    { id: "ecosystem", status: "UPCOMING" },
    { id: "growth", status: "UPCOMING" },
  ],
};

export const COMMUNITY_LINKS = [
  { key: "x", icon: "x", primary: true },
  { key: "telegramOfficial", icon: "telegram", primary: true },
  { key: "telegramCommunity", icon: "users", primary: true },
  { key: "discord", icon: "discord", primary: false },
  { key: "youtube", icon: "youtube", primary: false },
  { key: "tiktok", icon: "music", primary: false },
  { key: "instagram", icon: "camera", primary: false },
  { key: "facebook", icon: "facebook", primary: false },
  { key: "medium", icon: "book", primary: false },
  { key: "github", icon: "github", primary: false },
] as const;

export const ABOUT_ITEMS = [
  { id: "mining", icon: "pickaxe" },
  { id: "rewards", icon: "gift" },
  { id: "community", icon: "users" },
] as const;

export const ECOSYSTEM_ITEMS = [
  { id: "mining", icon: "pickaxe" },
  { id: "referral", icon: "users" },
  { id: "progression", icon: "layers" },
  { id: "rewards", icon: "gift" },
] as const;

export const HOW_STEPS = ["join", "mine", "earn", "grow"] as const;
export const FAQ_ITEMS = [
  { id: "project" }, { id: "symbol" }, { id: "blockchain" }, { id: "supply" },
  { id: "mining", link: "telegramBot" }, { id: "official", link: "telegramOfficial" },
  { id: "community", link: "telegramCommunity" }, { id: "contract", link: "tonviewer" },
  { id: "obtain", link: "buyToken" }, { id: "risks" },
] as const;

export type FaqId = (typeof FAQ_ITEMS)[number]["id"];