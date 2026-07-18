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
    ],
    sitemap: 'https://nexeagle.com/sitemap.xml',
  };
}
