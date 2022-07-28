import React from "react";
import { Box, ChakraProps, ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import theme from "../../@chakra-ui/gatsby-plugin/theme";
import { Header } from "../Header/Header";

// sm: "30em", // 480px (16pxの場合。以下同)
// md: "48em", // 768px
// lg: "62em", // 992px
// xl: "80em", // 1280px
export const BaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const maxW: ChakraProps["maxW"] = [400, 400, 688, 912];
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box
        maxW={maxW}
        minHeight="100vh"
        margin="56px auto 56px auto"
        // backgroundColor="var(--chakra-colors-base)"
        px={["16px", "0", "0", "0"]}
      >
        {children}
      </Box>
    </ChakraProvider>
  );
};
