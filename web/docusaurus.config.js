// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/palenight');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cluster Factory CE',
  tagline: 'A k8s-based infrastructure orchestration tool',
  url: 'https://docs.clusterfactory.io',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SquareFactory',
  projectName: 'cluster-factory-ce',
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/SquareFactory/cluster-factory-ce/tree/feat/docs/web/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/SquareFactory/cluster-factory-ce/tree/feat/docs/web/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'Cluster Factory CE Docs',
        logo: {
          alt: 'Cluster Factory CE Logo',
          src: 'img/logo.svg', // TODO
        },
        items: [
          {
            href: 'https://github.com/SquareFactory/cluster-factory-ce',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/docs/overview/intro',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started/requirements-recommendations',
              },
              {
                label: 'Contributing',
                to: '/docs/contributing',
              },
              {
                label: 'Frequently Asked Questions',
                to: '/docs/faq',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://mobile.twitter.com/squarefactoryai',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/squarefactory',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/SquareFactory/cluster-factory-ce',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Cluster Factory CE Docs, SquareFactory. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['properties', 'docker'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
