import React from 'react';
import { FC } from 'react';
import { GatsbyImageGenerator } from '../../../components/GatsbyImageGenerator';
// import { microCMSLoader } from '../../client';

export const h1: FC<{ children?: JSX.Element }> = (props) => <h1>{props.children}</h1>;
export const h2: FC<{ children?: JSX.Element }> = (props) => <h2>{props.children}</h2>;
export const h3: FC<{ children?: JSX.Element }> = (props) => <h3>{props.children}</h3>;
export const h4: FC<{ children?: JSX.Element }> = (props) => <h4>{props.children}</h4>;
export const h5: FC<{ children?: JSX.Element }> = (props) => <h5>{props.children}</h5>;
export const p: FC<{ children?: JSX.Element }> = (props) => <p>{props.children}</p>;
export const ul: FC<{ children?: JSX.Element }> = (props) => <ul>{props.children}</ul>;
export const li: FC<{ children?: JSX.Element }> = (props) => <li>{props.children}</li>;
export const strong: FC<{ children?: JSX.Element }> = (props) => <strong>{props.children}</strong>;
export const a: FC<{
  children?: JSX.Element;
  anchorAttr?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}> = (props) => <a href={props.anchorAttr?.href}>{props.children}</a>;
export const img: FC<{ imgAttr?: React.ImgHTMLAttributes<HTMLImageElement> }> = (props) => {
  return <GatsbyImageGenerator url={props.imgAttr?.src!} alt={props.imgAttr?.alt!} />;
};
export const em: FC<{ children?: JSX.Element }> = (props) => <em>{props.children}</em>;
export const s: FC<{ children?: JSX.Element }> = (props) => <s>{props.children}</s>;
export const u: FC<{ children?: JSX.Element }> = (props) => <u>{props.children}</u>;
export const code: FC<{ children?: JSX.Element }> = (props) => <code>{props.children}</code>;
// snippet
// export const : FC<{ children?: JSX.Element }> = (props) => <>{props.children}</>;
