import React from 'react';

import { ArticleCard } from './ArticleCard';
import { articleCardListType } from '../../models/microcms';
import './ArticleCardList.scss';

export const ArticleCardList: React.FC<{ articleCardList: articleCardListType }> = ({ articleCardList }) => {
  return (
    <section>
      <ul className="ArticleCardList">
        {articleCardList.map((articleCard) => {
          return (
            <li key={articleCard.node.id}>
              <ArticleCard articleCard={articleCard.node} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
