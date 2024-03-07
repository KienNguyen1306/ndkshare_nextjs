
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin','/private/'],
    },
    sitemap: `${process.env.NEXT_BASE_URL}/sitemap.xml`,
  }
}