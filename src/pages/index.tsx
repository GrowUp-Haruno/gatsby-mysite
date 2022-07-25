import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { ArticleCardList } from '../components/Article/ArticleCardList';
import { Header } from '../components/Header/Header';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import theme from '../@chakra-ui/gatsby-plugin/theme';

const Home: React.FC<PageProps<Queries.IndexQuery>> = ({ data }) => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box as="main" w={[360,580,1000]}>
        <ArticleCardList articleCardList={data.allMicrocmsBlogs.edges} />
      </Box>
    </ChakraProvider>
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
