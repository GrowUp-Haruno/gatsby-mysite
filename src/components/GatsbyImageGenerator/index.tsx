import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

/**
 * GraphQl Fileに登録されているurlを渡すとGatsby Imageを返す
 */
export const GatsbyImageGenerator: React.FC<JSX.IntrinsicElements["img"]> = (
  props
) => {
  // export const GatsbyImageGenerator: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
  const { allFile } = useStaticQuery<Queries.GatsbyImageConverterQuery>(graphql`
    query GatsbyImageConverter {
      allFile {
        edges {
          node {
            url
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  if (props.src === "") return null;
  const result = allFile.edges.filter(
    (element) => element.node.url === `${props.src}?q=100`
  );
  if (result.length === 0) return null;

  if (!result[0]) return null;
  if (!result[0].node) return null;
  if (!result[0].node.childImageSharp) return null;

  const image = getImage(result[0].node.childImageSharp.gatsbyImageData);

  if (!image) return null;
  return (
    <GatsbyImage
      image={image}
      alt={props.alt || ""}
      style={{ marginTop: props.style?.marginTop }}
    />
  );
};
