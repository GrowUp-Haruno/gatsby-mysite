import { articleImageSrcExtract } from "./src/libs/articleImageExtract/index";
import { GatsbyNode, Node } from "gatsby";
import parth from "html-react-parser";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;
  const result = await graphql<Queries.BlogIdListQuery>(`
    query BlogIdList {
      allMicrocmsBlogs {
        edges {
          node {
            blogsId
            id
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  if (!result.data) return;
  result.data.allMicrocmsBlogs.edges.forEach((edge) => {
    console.log(edge.node.blogsId);
    createPage({
      path: `/blogs/post/${edge.node.blogsId}`,
      component: path.resolve("./src/templates/articleTemplate.tsx"),
      context: {
        id: edge.node.id,
      },
    });
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type MicrocmsBlogs implements Node {
      eyecatchImg: File @link(from: "fields.eyecatchImg")
    }
    `);
  };

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  cache,
  actions: { createNode, createNodeField },
  createNodeId,
  getNodesByType,
}) => {
  const MicrocmsBlogsNodes = getNodesByType("MicrocmsBlogs");

  // 記事からアイキャッチ画像を抽出してGraphQLに接続
  for (const articleNode of MicrocmsBlogsNodes) {
    const eyecatch = articleNode.eyecatch as { url: string };
    const fileNode = await createRemoteFileNode({
      url: `${eyecatch.url}?q=100`,
      parentNodeId: articleNode.id,
      cache,
      createNode,
      createNodeId,
      httpHeaders: {
        timeout: 10000,
      },
    });
    if (fileNode) {
      createNodeField({
        node: articleNode,
        name: "eyecatchImg",
        value: fileNode.id,
      });
    }

    // 記事から画像データを抽出してGraphQLに接続
    const parthNodeTemp = parth(articleNode.content as string);
    const parthNode: JSX.Element[] = [];
    if (typeof parthNodeTemp === "object") {
      // 型JSX.Elementを型JSX.Element[]にするための処理
      if (!(parthNodeTemp instanceof Array)) parthNode.push(parthNodeTemp);
      else parthNode.push(...parthNodeTemp);

      for (const element of parthNode) {
        const urlList = articleImageSrcExtract(element);
        if (urlList.length !== 0) {
          for (const url of urlList) {
            await createRemoteFileNode({
              url: `${url}?q=100`,
              parentNodeId: articleNode.id,
              cache,
              createNode,
              createNodeId,
              httpHeaders: {
                timeout: 10000,
              },
            });
          }
        }
      }
    }
  }
};
