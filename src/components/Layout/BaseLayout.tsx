import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import theme from '../../@chakra-ui/gatsby-plugin/theme';
import { Header } from '../Header/Header';

export const BaseLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box as="main" w={[360, 580, 1000]}>
        {children}
      </Box>
    </ChakraProvider>
  );
};
