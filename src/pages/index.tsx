import { graphql, PageProps } from 'gatsby';
import React from 'react';
// import { PageProps } from 'gatsby';
// import { ArticleCard } from '../components/Article/ArticleCard';
import { ArticleCardList } from '../components/Article/ArticleCardList';
import { GatsbyImageGenerator } from '../components/GatsbyImageGenerator';
// import { GatsbyImageConverter } from '../components/GatsbyImageConverter';
import { Header } from '../components/Header/Header';
// import { Header } from '../components/Header/Header';
// import { microcmsDataType } from '../models/microcms';

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({ data }) => {
  console.log(data.allMicrocmsBlogs.edges);
  return (
    <>
      <Header />
      <GatsbyImageGenerator
        url="https://images.microcms-assets.io/assets/157404dc1ca1414195671e7b5ffd8c86/b9558350a7f3444482b037d833a7bccc/Untitled%20(1).png"
        alt=""
      />
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
