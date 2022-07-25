import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { ArticleCardList } from '../components/Article/ArticleCardList';
import { BaseLayout } from '../components/Layout/BaseLayout';

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({ data }) => {
  return (
    <BaseLayout>
      <ArticleCardList articleCardList={data.allMicrocmsBlogs.edges} />
    </BaseLayout>
  );
};

export default Home;

export const query = graphql`
  query Index {
    allMicrocmsBlogs {
      edges {
        node {
          id
          blogsId
          createdAt
          updatedAt
          mainTitle
          subTitle
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
