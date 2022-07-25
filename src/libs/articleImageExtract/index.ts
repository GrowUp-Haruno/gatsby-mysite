// JSX.Element(s)からimgタグを探してsrcを抽出後GraphQLに接続する
const innerArticleImageSrcExtract = (child: { [x: string]: any }) => {
  if (typeof child !== 'string' && child.type === 'img') {
    const childProps: { src: string } = child.props;
    return childProps.src;
  }
};

export const articleImageSrcExtract = (element: JSX.Element) => {
  let srcList: Array<string> = [];
  if (element.props.children instanceof Array) {
    const childList: Array<{ [x: string]: any }> = element.props.children;
    childList.forEach((child) => {
      const src = innerArticleImageSrcExtract(child);
      if (typeof src === 'string') srcList.push(src);
    });
  } else {
    const child = element.props.children;
    const src = innerArticleImageSrcExtract(child);
    if (typeof src === 'string') srcList.push(src);
  }
  return srcList;
};
