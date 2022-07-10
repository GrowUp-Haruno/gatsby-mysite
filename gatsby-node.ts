import { GatsbyNode, Node } from 'gatsby';
// import { Node } from 'domhandler';
// import { Link } from 'gatsby';
// import { categoryType, eyecatchType } from './src/models/microcms';
// import { GatsbyNode, graphql } from 'gatsby';
// import { writeFile } from 'fs';
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  getNodesByType,
  actions,
  schema,
}) => {
  const { createTypes } = actions;

  createTypes(`
    type MicrocmsBlogs implements Node {
      eyecatchImg: File @link(from: "fields.microcmsImg")
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
          // この方式はダメだった
          // node.microcmsImg = fileNode.id;
          // これなら大丈夫
          createNodeField({ node, name: 'microcmsImg', value: fileNode.id });
        }
        // if (node.eyecatch) {
        // }
      });
    }
  }
};
