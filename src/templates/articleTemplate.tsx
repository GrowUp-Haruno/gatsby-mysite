import { Stack, Heading, Tag, HStack, Text, Box } from "@chakra-ui/react";
import { faArrowsRotate, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { FC } from "react";

import { BaseLayout } from "../components/Layout/BaseLayout";
import { formatDate } from "../libs/formatDate";
import { StringHtmlToJsxElement } from "../libs/stringHtmlToJsxElement";

const ArticleTemplate: FC<PageProps<Queries.ArticleTemplateQuery>> = ({
  data,
}) => {
  const image = getImage(
    data.microcmsBlogs?.eyecatchImg?.childImageSharp?.gatsbyImageData!
  );

  const blog = StringHtmlToJsxElement(data);

  const createDate = formatDate(new Date(data.microcmsBlogs?.createdAt!));
  const updateDate = formatDate(new Date(data.microcmsBlogs?.updatedAt!));

  return (
    <BaseLayout>
      {/* メインタイトル */}
      <Heading as="h1" size="2xl" mt={16} mb={6}>
        {data.microcmsBlogs?.mainTitle}
      </Heading>
      {/* タグ */}
      <HStack>
        {data.microcmsBlogs?.categories?.map((category) => (
          <Tag key={category?.id}>{category?.name}</Tag>
        ))}
      </HStack>
      {/* 作成日と更新日 */}
      <HStack spacing={8} justify="end" mt={4}>
        <HStack spacing={4}>
          <FontAwesomeIcon icon={faFilePen} />
          <time dateTime={data.microcmsBlogs?.createdAt!}>{createDate}</time>
        </HStack>
        <Text>/</Text>
        <HStack spacing={4}>
          <FontAwesomeIcon icon={faArrowsRotate} />
          <time dateTime={data.microcmsBlogs?.updatedAt!}>{updateDate}</time>
        </HStack>
      </HStack>
      {/* アイキャッチ */}
      <GatsbyImage
        image={image!}
        alt="アイキャッチ"
        style={{ marginTop: "32px", borderRadius: "8px" }}
      />
      {blog}
    </BaseLayout>
  );
};

export const query = graphql`
  query ArticleTemplate($id: String!) {
    microcmsBlogs(id: { eq: $id }) {
      content
      mainTitle
      createdAt
      updatedAt
      eyecatchImg {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
      categories {
        id
        name
      }
    }
  }
`;

export default ArticleTemplate;
