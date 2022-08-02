export type siteMetadataType = NonNullable<
  NonNullable<Queries.IndexQuery["site"]>["siteMetadata"]
>;
