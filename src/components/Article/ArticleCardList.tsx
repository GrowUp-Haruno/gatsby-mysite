import React from 'react';

import { ArticleCard } from './ArticleCard';
import { articleCardListType } from '../../models/microcms';
// import './ArticleCardList.scss';
import { Box, List, ListItem, SimpleGrid } from '@chakra-ui/react';

export const ArticleCardList: React.FC<{ articleCardList: articleCardListType }> = ({ articleCardList }) => {
  return (
    <SimpleGrid as="section" columns={[1, 2, 3]} spacing={8}>
      {articleCardList.map((articleCard) => {
        return (
          <Box key={articleCard.node.id}>
            <ArticleCard articleCard={articleCard.node} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
