import { GatsbyNode, Node } from 'gatsby';
import parth from 'html-react-parser';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { articleImageExtract } from './src/libs/articleImageExtract';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MicrocmsBlogs implements Node {
      eyecatchImg: File @link(from: "fields.eyecatchImg")
      articleImg: File @link(from: "fields.articleImg")
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
        }

        // 記事から画像データを抽出してGraphQLに接続
        // node.contentからJSX.Element(s)に変換
        const parthNode = parth(node.content as string);

        if (typeof parthNode === 'object') {
          // JSX.Element[]の時
          if (parthNode instanceof Array) {
            parthNode.forEach((element) => {
              articleImageExtract(element);
            });
          }
          // JSX.Elementの時
          else {
            articleImageExtract(parthNode);
          }
        }
      });
    }
  }
};
