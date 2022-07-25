import { background, Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { faArrowsRotate, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import { formatDate } from '../../libs/formatDate';
import { articleCardType } from '../../models/microcms';
// import './ArticleCard.scss';

export const ArticleCard: React.FC<{ articleCard: articleCardType }> = ({ articleCard }) => {
  // Type Gard
  if (!articleCard.createdAt) return null;
  if (!articleCard.updatedAt) return null;
  if (!articleCard.categories) return null;
  if (!articleCard.eyecatch || !articleCard.eyecatch.url) return null;
  if (
    !articleCard.eyecatchImg ||
    !articleCard.eyecatchImg.childImageSharp ||
    !articleCard.eyecatchImg.childImageSharp.gatsbyImageData
  )
    return null;

  const createDate = formatDate(new Date(articleCard.createdAt));
  const updateDate = formatDate(new Date(articleCard.updatedAt));

  const cardImg = getImage(articleCard.eyecatchImg.childImageSharp.gatsbyImageData);

  return (
    <Link to={`/blogs/post/${articleCard.blogsId}`}>
      <VStack as="article" w="100%" h="100%" backgroundColor="var(--chakra-colors-main)">
        <GatsbyImage image={cardImg!} alt={`${articleCard.mainTitle}のサムネイル`} />
        <VStack spacing="16px" p={6} width="100%"  align="left" flexGrow={1}>
          <Heading as="h3" size="xs">
            {articleCard.subTitle}
          </Heading>
          <Heading as="h3" size="md">
            {articleCard.mainTitle}
          </Heading>
          <HStack fontSize="sm" justify="center" align="center" spacing={4}>
            <HStack spacing={1}>
              <FontAwesomeIcon icon={faFilePen} />
              <time dateTime={articleCard.createdAt!}>{createDate}</time>
            </HStack>
            <HStack spacing={1}>
              <FontAwesomeIcon icon={faArrowsRotate} />
              <time dateTime={articleCard.updatedAt}>{updateDate}</time>
            </HStack>
          </HStack>
          <HStack spacing={2} fontSize="sm">
            {articleCard.categories.map((category) => {
              // Type Gard
              if (!category) return null;
              return (
                <Box key={category.id} backgroundColor="#999999" color="var(--chakra-colors-base)" p="2px 8px">
                  <span>{category.name}</span>
                </Box>
              );
            })}
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
};
