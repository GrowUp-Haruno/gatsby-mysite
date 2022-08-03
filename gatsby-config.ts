import type { GatsbyConfig } from "gatsby";

// const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteName: `Grow Up`,
    siteUrl: process.env.SITE_URL,
    repositoryName: process.env.REPOSITORY_NAME
      ? process.env.REPOSITORY_NAME
      : "",
    description: "学びで得た知識を日々アウトプットするブログ",
    site: process.env.TWITTER_SITE,
    creator: process.env.TWITTER_CREATOR,
    twitterCard: "summary_large_image",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      // src/images内のファイルをGraphQLから取得できるようにする
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.API_KEY,
        serviceId: "harulog",
        apis: [
          {
            endpoint: "blogs",
          },
        ],
      },
    },
  ],
  pathPrefix: process.env.GITHUB_ACTIONS ? "/gatsby-mysite" : "",
};

export default config;
