import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { ogType, siteMetadataType } from "../../models/meta";

export const SEO: FC<{
  siteMetadata: siteMetadataType;
  metaImgSrc?: string;
  ogType: ogType;
  articleUrl?: string;
}> = ({ siteMetadata, metaImgSrc, ogType, articleUrl }) => {
  const title = `${siteMetadata.siteName} | `;
  console.log(metaImgSrc);
  return (
    <Helmet
      htmlAttributes={{ lang: "ja" }}
      title={title}
      meta={[
        { name: "twitter:card", content: `${siteMetadata.twitterCard}` },
        { name: "twitter:site", content: `${siteMetadata.site}` },
        { name: "twitter:creator", content: `${siteMetadata.creator}` },
        { name: "og:title", content: `${title}` },
        { name: "og:site_name", content: `${siteMetadata.siteName}` },
        { name: "og:description", content: `${siteMetadata.description}` },
        { name: "og:image", content: `${siteMetadata.siteUrl}${metaImgSrc}` },
        { name: "og:type", content: ogType },
        {
          name: "og:url",
          content: `${siteMetadata.siteUrl}${articleUrl ? articleUrl : ""}`,
        },
      ]}
    />
  );
};

{
  /* <meta name="twitter:card" content="summary_large_image"></meta> */
}
