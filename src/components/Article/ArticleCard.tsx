import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { formatDate } from '../../libs/formatDate';
import { articleCardType } from '../../models/microcms';
import './ArticleCard.scss';

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
    <article className="articleCard">
      {/* <img src={articleCard.eyecatch.url} alt="サムネイル１" /> */}
      <GatsbyImage image={cardImg!} alt="カードイメージ"/>
      <div>
        <h3>{articleCard.subTitle}</h3>
        <h2>{articleCard.mainTitle}</h2>
        <p>
          <time dateTime={articleCard.createdAt!}>
            {/* <Image src="/icons/filePenSolid.svg" width={12} height={12} alt="作成日時" /> */}
            {createDate}
          </time>

          <time dateTime={articleCard.updatedAt}>
            {/* <Image src="/icons/arrowsRotateSolid.svg" width={12} height={12} alt="更新日時" /> */}
            {updateDate}
          </time>
        </p>
        <div>
          <ul>
            {articleCard.categories.map((category) => {
              // Type Gard
              if (!category) return null;
              return (
                <li key={category.id}>
                  <span>{category.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};
