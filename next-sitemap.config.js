/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://plant-check.vercel.app';

module.exports = {
  siteUrl, // Base URL of the site
  generateRobotsTxt: true, // Generate robots.txt file
  exclude: ['/icon.png'], // Exclude unnecessary files or paths
  changefreq: 'weekly', // Default change frequency for pages
  priority: 0.7, // Default priority for pages
  sitemapSize: 5000, // Split sitemaps if exceeding 5000 URLs
  transform: async (config, path) => {
    // Default transformation for regular pages
    return {
      loc: `${siteUrl}${path}`, // Full URL of the path
      changefreq: config.changefreq || 'weekly',
      priority: config.priority || 0.7,
    };
  },
};
