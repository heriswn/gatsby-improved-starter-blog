const config = {
  siteTitle: 'Gatsby Improved Starter Blog',
  siteTitleShort: 'Gatsby Improved Blog',
  siteTitleAlt: 'Gatsby Improved Starter Blog',
  siteLogo: '../images/gatsby-icon.png',
  siteUrl: 'https://gatsbyimprovedstarterblog.gatsbyjs.io/',
  repo: 'https://github.com/heriswn/gatsby-improved-starter-blog',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'An improved starter blog demonstrating what Gatsby can do.',
  siteRss: '/rss.xml',
//   googleAnalyticsID: 'UA-XXXXXXXXXX-X',
  postDefaultCategoryID: 'Tech',
  userName: 'Heri',
  userEmail: 'heri15002@mail.unpad.ac.id',
  userTwitter: 'analystid',
  menuLinks: [
    {
      name: 'Blog',
      link: '/blog/',
    },
    {
      name: 'Project',
      link: '/project/'
    },
    // {
    //   name: "Work",
    //   link: "/work/"
    // },
    {
      name: 'About',
      link: '/about/',
    },
    // {
    //   name: 'Contact',
    //   link: '/contact',
    // },
    // {
    //   name: 'Contact',
    //   link: '/contact/',
    // },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config