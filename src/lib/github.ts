import "server-only";
import { siteConfig } from "@/config/site";

const REPO = siteConfig.links.github.replace("https://github.com/", "");

/** Live star count for the repo, cached for an hour. Falls back to siteConfig on failure. */
export async function getGitHubStars(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return siteConfig.stats.stars;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : siteConfig.stats.stars;
  } catch {
    return siteConfig.stats.stars;
  }
}
