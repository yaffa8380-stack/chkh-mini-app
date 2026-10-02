import type { ReactNode, SVGProps } from "react";

export type IconName = "arrowUpRight" | "arrowRight" | "arrowDown" | "globe" | "copy" | "check" | "search" | "pickaxe" | "users" | "layers" | "gift" | "shield" | "info" | "close" | "rocket" | "ton" | "telegram" | "x" | "discord" | "youtube" | "github" | "music" | "camera" | "facebook" | "book" | "plus";

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrowUpRight: <><path d="M6 18 18 6M6 6h12v12" /></>,
    arrowRight: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    arrowDown: <><path d="M12 4v16m-6-6 6 6 6-6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" /></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    pickaxe: <><path d="m4 20 11-11M14 5l5 5M8 4c5-2 11 2 12 8l-4-3-4-4Z" /><path d="m12 12 2 2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    layers: <><path d="m12 3 10 6-10 6L2 9l10-6Zm-10 12 10 6 10-6M2 12l10 6 10-6" /></>,
    gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13" /><path d="M12 8H7.5A2.5 2.5 0 1 1 10 5.5L12 8Zm0 0h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6l8-3Z" /><path d="M12 8v5m0 3h.01" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10h.01" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    rocket: <><path d="M14 4c2-1 4-1 6 0 1 5-3 10-7 12l-5-5c1-3 3-5 6-7Z" /><circle cx="16" cy="8" r="1.5" /><path d="m8 11-4 1-1 4 6-1m4 1-1 5 4-1 1-5M6 17l-3 4 4-2" /></>,
    ton: <path d="M4.5 5h15a1 1 0 0 1 .8 1.6L12 20 3.7 6.6A1 1 0 0 1 4.5 5ZM12 5v15" />,
    telegram: <><path d="m21 3-4 18-6-5-4 3v-6L3 11 21 3Z" /><path d="m7 13 14-10-10 13" /></>,
    x: <><path d="M4 3h5l11 18h-5L4 3ZM20 3 4 21" /></>,
    discord: <><path d="M8 5 5 6c-2 3-3 7-3 10l5 3 2-3m6 0 2 3 5-3c0-3-1-7-3-10l-3-1-1 2H9L8 5Z" /><circle cx="8.5" cy="12" r="1" /><circle cx="15.5" cy="12" r="1" /><path d="M8 16c3 1 5 1 8 0" /></>,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
    github: <><path d="M9 21v-3c-5 1-5-3-7-3m16 6v-4c0-1-.4-2-1-2 3-.4 5-2 5-5a6 6 0 0 0-2-4c.5-1 .5-3 0-4-2 0-3 1-4 2a15 15 0 0 0-8 0C7 3 6 2 4 2c-.5 1-.5 3 0 4a6 6 0 0 0-2 4c0 3 2 5 5 5-.6.5-1 1.5-1 3v3" /></>,
    music: <><path d="M9 18V5l12-2v13M9 8l12-2" /><ellipse cx="6" cy="18" rx="3" ry="3" /><ellipse cx="18" cy="16" rx="3" ry="3" /></>,
    camera: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
    facebook: <path d="M15 21v-8h3l1-4h-4V7c0-1 .5-2 2-2h2V2h-3c-4 0-5 2-5 5v2H8v4h3v8" />,
    book: <><path d="M12 5v16M3 3c3 0 6 0 9 2 3-2 6-2 9-2v16c-3 0-6 0-9 2-3-2-6-2-9-2V3Z" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}