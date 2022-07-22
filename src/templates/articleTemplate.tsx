import { graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';
import { Header } from '../components/Header/Header';
import { StringHtmlToJsxElement } from '../libs/stringHtmlToJsxElement';
import './articleTemplate.scss';

const ArticleTemplate: FC<PageProps<Queries.ArticleTemplateQuery>> = ({ data }) => {
  const blog = StringHtmlToJsxElement(data);

  return (
    <>
      {/* <Header />
      <title>Create Next App</title> */}
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
