# メモ

## gatsby-configのpluginsの並びに注意

### きっかけ
microCMSからのブログデータのnodeをgatsby-nodeのsourceNodesで拾えない問題があった。

### 調査
gatsby-nodeのonCreateNodeを使ってmicroCMSからのブログデータのnodeがいつ拾えるかを確認した。

```js
exports.sourceNodes = async ({
  store,
  cache,
  actions: { createNode, createNodeField },
  createNodeId,
  getNodesByType,
}) => {
  const MicrocmsBlogNodes = getNodesByType(`MicrocmsBlogs`)
  console.log(`sourceNodes:${MicrocmsBlogNodes}`)
}

exports.onCreateNode = ({getNodesByType}) => {
  const MicrocmsBlogNodes = getNodesByType(`MicrocmsBlogs`)
  console.log(`onCreateNode:${MicrocmsBlogNodes}`)

}
```

### 結果
gatsby-nodeのsourceNodesの時点では取得できないが、その後のonCreateNodeで取得されていた
```
success createSchemaCustomization - 0.019s
onCreateNode:
(中略)
onCreateNode:
sourceNodes:
success Checking for changed pages - 0.001s
success source and transform nodes - 1.119s
success building schema - 0.550s
success createPages - 0.006s
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
(中略)
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
success createPagesStatefully - 0.210s
```

### 原因
(Gatsby Node APIs)[https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes]にヒントがありました。以下直訳
```
この API は、プラグインごとに一度だけ呼び出されます
（あなたのサイトの gatsby-config.js ファイルに対しても一度だけ呼び出されます）。
```

### gatsby-configをpluginsを見直すと...
pluginsは配列で宣言されていました。
```js
plugins: [
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  // 中略

  {
  resolve: "gatsby-source-microcms",
  options: {
    apiKey: process.env.API_KEY,
    serviceId: "harulog",
    apis: [
        {
          endpoint: "blogs",
        },
      ],
    },
  } ,

]
```

### 配列なので並び順を変えてみると...
配列ということは、宣言した順に読み込まれると推察してgatsby-source-microcmsを先頭に配置して確認すると、sourceNodesの手前で読み込まれるようになり、
sourceNodesでも取得できるようになりました。

```
success createSchemaCustomization - 0.019s
onCreateNode:
(中略)
onCreateNode:
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
sourceNodes:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
success Checking for changed pages - 0.001s
success source and transform nodes - 0.971s
success building schema - 0.707s
success createPages - 0.010s
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
(中略)
onCreateNode:[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
success createPagesStatefully - 0.255s
```

### 最後に
gatsby-nodeのsourceNodesでnodeが拾えない事象が発生した場合は、ログ出力やpluginsの並びを確認するようにしましょう。