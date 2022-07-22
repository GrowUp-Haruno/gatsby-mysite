import React, { FC } from 'react';
import HTMLReactParser, { attributesToProps, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import { GatsbyImageGenerator } from '../../components/GatsbyImageGenerator';

const replace: HTMLReactParserOptions['replace'] = (domNode) => {
  // 余分なdomNodeの場合はスキップ
  if (!(domNode instanceof Element && domNode.type === 'tag' )) return null;

  // 置換タグのpropsを定義
  const props = attributesToProps(domNode.attribs);

  // imgタグが入れ子になるのを防止
  if (domNode.children[0] instanceof Element && domNode.children[0].name === 'img') {
    return <React.Fragment {...props}>{domToReact(domNode.children, { replace })}</React.Fragment>;
  }
  
  //
  if (domNode.name === 'strong') return <strong {...props} className=''>{domToReact(domNode.children, { replace })}</strong>;
  if (domNode.name === 'code') return <code {...props}>{domToReact(domNode.children, { replace })}</code>;
  if (domNode.name === 'h1') return <h1 {...props}>{domToReact(domNode.children, { replace })}</h1>;
  if (domNode.name === 'h2') return <h2 {...props}>{domToReact(domNode.children, { replace })}</h2>;
  if (domNode.name === 'h3') return <h3 {...props}>{domToReact(domNode.children, { replace })}</h3>;
  if (domNode.name === 'h4') return <h4 {...props}>{domToReact(domNode.children, { replace })}</h4>;
  if (domNode.name === 'h5') return <h5 {...props}>{domToReact(domNode.children, { replace })}</h5>;
  if (domNode.name === 'h6') return <h6 {...props}>{domToReact(domNode.children, { replace })}</h6>;
  if (domNode.name === 'ul') return <ul {...props}>{domToReact(domNode.children, { replace })}</ul>;
  if (domNode.name === 'li') return <li {...props}>{domToReact(domNode.children, { replace })}</li>;
  if (domNode.name === 'em') return <em {...props}>{domToReact(domNode.children, { replace })}</em>;
  if (domNode.name === 'a') return <a {...props}>{domToReact(domNode.children, { replace })}</a>;
  if (domNode.name === 'p') return <p {...props}>{domToReact(domNode.children, { replace })}</p>;
  if (domNode.name === 's') return <s {...props}>{domToReact(domNode.children, { replace })}</s>;
  if (domNode.name === 'u') return <u {...props}>{domToReact(domNode.children, { replace })}</u>;
  if (domNode.name === 'img') return <GatsbyImageGenerator {...props} />;
  if (domNode.name === 'br') return <br />;

  console.log(`${domNode.name}が未定義です`);

  return null;
};

export const StringHtmlToJsxElement = (data: Queries.ArticleTemplateQuery) => {
  if (!data) return null;
  if (!data.microcmsBlogs || !data.microcmsBlogs.content) return null;
  return HTMLReactParser(data.microcmsBlogs.content, { replace });
};
