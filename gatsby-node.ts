import { articleImageSrcExtract } from './src/libs/articleImageExtract/index';
import { GatsbyNode, Node } from 'gatsby';
import parth from 'html-react-parser';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
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
  if (!result.data) return 
  result.data.allMicrocmsBlogs.edges.forEach((edge) => {
    console.log(edge.node.blogsId);
    createPage({ path: `/blogs/post/${edge.node.blogsId}`,component:path.resolve("./src/templates/articleTemplate.tsx"),context:{id:edge.node.id} });
  })
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MicrocmsBlogs implements Node {
      eyecatchImg: File @link(from: "fields.eyecatchImg")
    }
    type File implements Node {
      url: String
    }
    `);
};

let flag = false;
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  getNodesByType,
  getCache,
  actions: { createNode, createNodeField },
  createNodeId,
  getNode,
  node,
}) => {
  if (!flag) {
    const MicrocmsBlogsNodes = getNodesByType('MicrocmsBlogs');
    // const MicrocmsBlogsNodes = getNodesByType('MicrocmsBlogs') as unknown as Array<Queries.MicrocmsBlogs>;

    if (MicrocmsBlogsNodes.length !== 0) {
      flag = true;
      // const fileNode = getNodesByType('File');
      // console.log(fileNode);

      MicrocmsBlogsNodes.forEach(async (node) => {
        // eyecatchから画像データを抽出してGraphQLに接続
        const eyecatch = node.eyecatch as { url: string };
        const fileNode = await createRemoteFileNode({
          url: `${eyecatch.url}?q=100`,
          parentNodeId: node.id,
          getCache,
          createNode,
          createNodeId,
          httpHeaders: {
            timeout: 10000,
          },
        });
        if (fileNode) {
          createNodeField({ node, name: 'eyecatchImg', value: fileNode.id });
          // createNodeField({
          //   node: fileNode,
          //   name: 'url',
          //   value: eyecatch.url,
          // });
        }

        // 記事から画像データを抽出してGraphQLに接続
        // node.contentからJSX.Element(s)に変換
        const parthNode = parth(node.content as string);
        if (typeof parthNode === 'object') {
          // JSX.Element[]の時
          if (parthNode instanceof Array) {
            parthNode.forEach((element) => {
              const urlList = articleImageSrcExtract(element);
              if (urlList.length !== 0) {
                urlList.forEach(async (url) => {
                  const fileNode = await createRemoteFileNode({
                    url: `${url}?q=100`,
                    parentNodeId: node.id,
                    getCache,
                    createNode,
                    createNodeId,
                    httpHeaders: {
                      timeout: 10000,
                    },
                  });
                  if (fileNode) {
                    node.localFile___NODE = fileNode.id;
                    createNodeField({ node: fileNode, name: 'url', value: url });
                  }
                });
              }
            });
          }
          // JSX.Elementの時
          else {
            const urlList = articleImageSrcExtract(parthNode);
            if (urlList.length !== 0) {
              urlList.forEach(async (url) => {
                const fileNode = await createRemoteFileNode({
                  url: `${url}?q=100`,
                  parentNodeId: node.id,
                  getCache,
                  createNode,
                  createNodeId,
                  httpHeaders: {
                    timeout: 10000,
                  },
                });
                if (fileNode) {
                  node.localFile___NODE = fileNode.id;
                  createNodeField({ node: fileNode, name: 'url', value: url });
                }
              });
            }
          }
        }
      });
    }
  }
};