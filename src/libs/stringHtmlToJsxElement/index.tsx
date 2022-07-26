import React, { FC } from "react";
import HTMLReactParser, {
  attributesToProps,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { GatsbyImageGenerator } from "../../components/GatsbyImageGenerator";
import {
  Code,
  Heading,
  Link as CLink,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";

const replace: HTMLReactParserOptions["replace"] = (domNode) => {
  // 余分なdomNodeの場合はスキップ
  if (!(domNode instanceof Element && domNode.type === "tag")) return null;

  // 置換タグのpropsを定義
  // 入れ子の処理はchildrenで設定(replace関数を再帰)
  const props = {
    ...attributesToProps(domNode.attribs),
    children: domToReact(domNode.children, { replace }),
  };
  const name = domNode.name;

  // imgタグが入れ子になるのを防止
  if (
    domNode.children[0] instanceof Element &&
    domNode.children[0].name === "img"
  ) {
    return <React.Fragment {...props} />;
  }

  if (name === "strong") return <Text as="strong" {...props} />;
  if (name === "code") return <Code {...props} />;
  if (name === "h1") return <Heading as="h1" {...props} mt={8} mb={6} />;
  if (name === "h2") return <Heading as="h2" {...props} mt={16} mb={6} />;
  if (name === "h3") return <Heading as="h3" {...props} mt={16} mb={6} />;
  if (name === "h4") return <Heading as="h4" {...props} />;
  if (name === "h5") return <Heading as="h5" {...props} />;
  if (name === "h6") return <Heading as="h6" {...props} />;
  if (name === "ul") return <List {...props} />;
  if (name === "li") return <ListItem {...props} />;
  if (name === "em") return <Text as="em" {...props} />;
  if (name === "a") return <CLink {...props} color="#0066CC" />;
  if (name === "p") return <Text as="p" {...props} />;
  if (name === "s") return <Text as="s" {...props} />;
  if (name === "u") return <Text as="u" {...props} />;
  if (name === "img") return <GatsbyImageGenerator {...props} />;
  if (name === "br") return <br />;

  console.log(`${domNode.name}が未定義です`);
  return null;
};

export const StringHtmlToJsxElement = (data: Queries.ArticleTemplateQuery) => {
  if (!data) return null;
  if (!data.microcmsBlogs || !data.microcmsBlogs.content) return null;
  return HTMLReactParser(data.microcmsBlogs.content, { replace });
};
