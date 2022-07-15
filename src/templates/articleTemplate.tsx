import { graphql, PageProps } from 'gatsby'
import React, { FC } from 'react'

const ArticleTemplate: FC<PageProps<Queries.ArticleTemplateQuery>> = ({ data }) => {
  
  // if (!data.allMicrocmsBlogs) return null;

  console.log(data);
  return <div>ArticleTemplate</div>;
};

export const query = graphql`
  query ArticleTemplate($id: String!) {
    microcmsBlogs(id: { eq: $id }) {
      content
    }
  }
`;


export default ArticleTemplate