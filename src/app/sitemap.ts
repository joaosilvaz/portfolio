import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const siteUrl = 'https://joaovitor.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}`])),
    },
  }))
}
