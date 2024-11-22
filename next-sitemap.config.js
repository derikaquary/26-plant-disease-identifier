/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://plant-check.vercel.app';

module.exports = {
  siteUrl, // Base URL of your site
  generateRobotsTxt: true, // Generate robots.txt file
  exclude: ['/icon.png'], // Exclude paths
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    if (path === '/') {
      // Add custom hash-based URLs for the homepage
      return [
        { loc: `${siteUrl}/#first_page`, changefreq: 'weekly', priority: 0.7 },
        { loc: `${siteUrl}/#skill`, changefreq: 'weekly', priority: 0.7 },
        { loc: `${siteUrl}/#projects`, changefreq: 'weekly', priority: 0.7 },
      ];
    }
    // Default transformation for other pages
    return {
      loc: `${siteUrl}${path}`,
      changefreq: config.changefreq || 'weekly',
      priority: config.priority || 0.7,
    };
  },
};
