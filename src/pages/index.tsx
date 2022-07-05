import { graphql, PageProps } from 'gatsby';
import React from 'react';
// import { PageProps } from 'gatsby';
// import { ArticleCard } from '../components/Article/ArticleCard';
import { ArticleCardList } from '../components/Article/ArticleCardList';
import { Header } from '../components/Header/Header';
// import { Header } from '../components/Header/Header';
// import { microcmsDataType } from '../models/microcms';

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({data}) => {
  console.log(data.allMicrocmsBlogs.edges);
  return (
    <>
      <Header />

      <title>Create Next App</title>
      <main><ArticleCardList articleCardList={data.allMicrocmsBlogs.edges} /></main>
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
        }
      }
    }
  }
`;