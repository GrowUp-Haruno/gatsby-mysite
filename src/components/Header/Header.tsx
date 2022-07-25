import { Box, Flex, HStack } from '@chakra-ui/react';
import * as React from 'react';


export const Header = () => {
  return (
    <HStack
      position="sticky"
      alignItems="center"
      zIndex={1}
      top="-56px"
      width="100%"
      height="96px"
      borderBottom="1px solid var(--chakra-colors-accent)"
      padding="0 2rem"
      backgroundColor="var(--chakra-colors-base)"
    >
      <Flex flexGrow={1} position="sticky" height="40px" justifyContent="space-between" alignItems="center" top={0}>
        <Box fontSize="1.5rem">Logo</Box>
        <HStack>
          <Box>Blog</Box>
        </HStack>
      </Flex>
    </HStack>
  );
};
