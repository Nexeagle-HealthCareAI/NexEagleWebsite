import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicit, named allow for AI crawlers/answer engines — matches the
      // wildcard rule above in effect, but states the intent plainly rather
      // than relying on bots correctly falling back to '*'.
      {
        userAgent: ['ChatGPT-User', 'OAI-SearchBot', 'anthropic-ai', 'ClaudeBot', 'PerplexityBot'],
        allow: '/',
      },
      // Explicit Bingbot allow — ChatGPT's live-search feature is powered by
      // Bing's index, so this doubles as an AI-crawl signal, not just classic
      // web search. Practo and JustDial both take this same explicit-over-
      // wildcard approach.
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: 'https://nexeagle.com/sitemap.xml',
  };
}
