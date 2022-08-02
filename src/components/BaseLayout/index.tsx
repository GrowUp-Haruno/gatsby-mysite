import React, { ReactNode } from "react";
import { Box, ChakraProps, ChakraProvider } from "@chakra-ui/react";
import theme from "../../@chakra-ui/gatsby-plugin/theme";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { SEO } from "./SEO";
import { ogType, siteMetadataType } from "../../models/meta";

// sm: "30em", // 480px (16pxの場合。以下同)
// md: "48em", // 768px
// lg: "62em", // 992px
// xl: "80em", // 1280px

export const BaseLayout: React.FC<{
  children: ReactNode;
  siteMetadata: siteMetadataType;
  metaImgSrc?: string;
  ogType: ogType;
  articleUrl?: string;
}> = ({ children, siteMetadata, metaImgSrc, ogType,articleUrl }) => {
  const maxW: ChakraProps["maxW"] = [400, 400, 688, 912];
  return (
    <ChakraProvider theme={theme}>
      <SEO
        siteMetadata={siteMetadata}
        metaImgSrc={metaImgSrc}
        ogType={ogType}
        articleUrl={articleUrl}
      />
      <Header />
      <Box pb={4}>
        <Box
          maxW={maxW}
          minHeight="100vh"
          margin="56px auto 56px auto"
          // backgroundColor="var(--chakra-colors-base)"
          px={["16px", "0", "0", "0"]}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </ChakraProvider>
  );
};
