import { Stack } from "@chakra-ui/react";
import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";

import { BaseLayout } from "../components/Layout/BaseLayout";
import { StringHtmlToJsxElement } from "../libs/stringHtmlToJsxElement";

const ArticleTemplate: FC<PageProps<Queries.ArticleTemplateQuery>> = ({
  data,
}) => {
  const blog = StringHtmlToJsxElement(data);

  return (
    <BaseLayout>
      {blog}
      {/* <Stack spacing={4}>{blog}</Stack> */}
    </BaseLayout>
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
