import type { IncomingMessage, ServerResponse } from "node:http";
import { WEBSITE_URL } from "../src/config/site.js";
import { safeWebsiteOrigin } from "../src/seo/urls.js";

export default function robots(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.statusCode = 405;
    response.end();
    return;
  }
  const website = process.env.WEBSITE_URL || WEBSITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  const origin = safeWebsiteOrigin(website);
  const preview = process.env.VERCEL_ENV === "preview";
  const body = preview ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  response.end(request.method === "HEAD" ? undefined : body);
}