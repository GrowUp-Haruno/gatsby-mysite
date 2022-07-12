// JSX.Element(s)からimgタグを探してsrcを抽出後GraphQLに接続する
const innerArticleImageExtract = (child: { [x: string]: any }) => {
  if (typeof child !== 'string' && child.type === 'img') {
    const childProps: { src: string } = child.props;
    console.log(childProps.src);
  }
};

export const articleImageExtract = (element: JSX.Element) => {
  if (element.props.children instanceof Array) {
    const childList: Array<{ [x: string]: any }> = element.props.children;
    childList.forEach((child) => {
      innerArticleImageExtract(child);
    });
  } else {
    const child = element.props.children;
    innerArticleImageExtract(child);
  }
};
