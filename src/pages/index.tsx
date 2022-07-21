import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { ArticleCardList } from '../components/Article/ArticleCardList';
import { Header } from '../components/Header/Header';

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({ data }) => {
  console.log(data.allMicrocmsBlogs.edges);
  return (
    <>
      <Header />
      <title>Create Next App</title>
      <main>
        <ArticleCardList articleCardList={data.allMicrocmsBlogs.edges} />
      </main>
    </>
  );
};

export default Home;

export const query = graphql`
  query Index {
    allMicrocmsBlogs {
      edges {
        node {
          id
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
