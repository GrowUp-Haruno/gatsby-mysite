import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { siteMetadataType } from "../models/meta";

export const SEO: FC<{ siteMetadata: siteMetadataType }> = ({
  siteMetadata,
}) => {
  const title = `${siteMetadata.baseTitle}`
  return (
    <Helmet
      htmlAttributes={{ lang: "ja" }}
      title={title}
      meta={[
        { name: "twitter:card", content: `${siteMetadata.twitterCard}` },
        { name: "twitter:site", content: `${siteMetadata.site}` },
        { name: "twitter:creator", content: `${siteMetadata.creator}` },
        { name: "og:url", content: `${siteMetadata.siteUrl}` },
        { name: "og:title", content: `${title}` },
        { name: "og:description", content: `${siteMetadata.description}` },
        { name: "og:image", content: `${siteMetadata.siteUrl}` },
      ]}
    />
  );
};