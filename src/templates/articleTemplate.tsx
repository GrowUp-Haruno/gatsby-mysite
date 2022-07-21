import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Header } from '../components/Header/Header';
import { stringHtmlToJsxElement } from '../libs/stringHtmlToJsxElement';

const ArticleTemplate: FC<PageProps<Queries.ArticleTemplateQuery>> = ({ data }) => {
  if (!data) return null;
  if (!data.microcmsBlogs || !data.microcmsBlogs.content) return null;
  const blog = stringHtmlToJsxElement(data.microcmsBlogs.content);

  return (
    <>
      <Header />
      <title>Create Next App</title>
      <main>{blog}</main>
    </>
  );
};

export const query = graphql`
  query ArticleTemplate($id: String!) {
    microcmsBlogs(id: { eq: $id }) {
      content
    }
  }
`;

export default ArticleTemplate;
