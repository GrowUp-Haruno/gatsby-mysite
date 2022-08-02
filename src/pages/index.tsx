import React from "react";
import { graphql, PageProps } from "gatsby";

import { ArticleCardList } from "../components/Article/ArticleCardList";
import { BaseLayout } from "../components/BaseLayout";

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({ data }) => {
  const metaImgSrc = data.file?.childImageSharp?.fluid?.src;
  return (
    <BaseLayout
      siteMetadata={data.site?.siteMetadata!}
      metaImgSrc={metaImgSrc}
      ogType="blog"
    >
      <ArticleCardList articleCardList={data.allMicrocmsBlogs.edges} />
    </BaseLayout>
  );
};

export default Home;

export const query = graphql`
  query Index {
    site {
      siteMetadata {
        siteName
        siteUrl
        description
        site
        creator
        twitterCard
      }
    }
    file(name: { eq: "cardImg" }) {
      childImageSharp {
        fluid(maxHeight: 418, maxWidth: 800) {
          src
        }
      }
    }
    allMicrocmsBlogs {
      edges {
        node {
          id
          blogsId
          createdAt
          updatedAt
          mainTitle
          eyecatch {
            url
            width
            height
          }
          categories {
            id
            name
          }
          eyecatchImg {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;
