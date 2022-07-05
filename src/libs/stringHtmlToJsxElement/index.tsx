import React from 'react';
import parth, { DOMNode, Element } from 'html-react-parser';
import { jsxElementGenerator } from './libs/jsxElementGenerator';

const replace: (domNode: DOMNode) => JSX.Element | null = (domNode) => {
  if (!(domNode instanceof Element)) return null;
  if (!(domNode.parent === null)) return null;

  const resultElements: Array<JSX.Element> = [];
  resultElements.push(...jsxElementGenerator(domNode));

  return (
    <>
      {resultElements.map((result, index) => (
        <React.Fragment key={index}>{result}</React.Fragment>
      ))}
    </>
  );
};

export const stringHtmlToJsxElement: (html: string) => string | JSX.Element | JSX.Element[] = (html) =>
  parth(html, { replace });
