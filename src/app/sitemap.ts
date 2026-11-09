import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://clinicdesk.in";

  const routes = [
    "",
    "/features",
    "/how-it-works",
    "/no-show-report",
    "/pricing",
    "/security",
    "/about",
    "/contact",
    "/demo",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/no-show-report" ? 0.9 : 0.8,
  }));
}
