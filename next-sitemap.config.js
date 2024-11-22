/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://your-default-site.com',
  generateRobotsTxt: true, // Generates robots.txt file
  changefreq: 'weekly', // Optional: Set default change frequency
  priority: 0.7,        // Optional: Set default priority
  sitemapSize: 5000,    // Optional: Split sitemaps if you have more than 5000 URLs
};
