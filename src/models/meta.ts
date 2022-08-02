export type siteMetadataType = NonNullable<
  NonNullable<Queries.IndexQuery["site"]>["siteMetadata"]
>;

export type ogType = "blog" | "article";