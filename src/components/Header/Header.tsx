import { Box, Flex, HStack } from "@chakra-ui/react";
import { Link } from "gatsby";
import * as React from "react";
import theme from "../../@chakra-ui/gatsby-plugin/theme";

export const Header = () => {
  return (
    <HStack
      position="sticky"
      alignItems="center"
      zIndex={1}
      top="-56px"
      width="100%"
      height="96px"
      borderBottom="1px"
      borderBottomStyle='solid'
      borderBottomColor="accent"
      padding="0 2rem"
      backgroundColor="base"
    >
      <Flex
        flexGrow={1}
        position="sticky"
        height="40px"
        justifyContent="space-between"
        alignItems="center"
        top={0}
      >
        <Box fontSize="1.5rem">
          <Link to="/">Logo</Link>
        </Box>
        <HStack>
          <Box>Blog</Box>
        </HStack>
      </Flex>
    </HStack>
  );
};
