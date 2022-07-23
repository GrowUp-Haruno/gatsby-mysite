import { extendTheme, ChakraTheme } from '@chakra-ui/react';
import '@fontsource/noto-sans-jp';

const theme: {
  styles: ChakraTheme['styles'];
  colors: ChakraTheme['colors'];
} = {
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSize: '16px',
        color: 'var(--chakra-colors-paragraph)',
        backgroundColor: 'var(--chakra-colors-base)',
        width: '100%',
      },
      a: {
        color: 'inherits',
        textDecoration: 'none',
      },
      main: {
        minHeight: '100vh',
        margin: '56px auto 0 auto',
        backgroundColor: 'var(--chakra-colors-main)',
        width: 'var(--width-pc)',
      },
    },
  },
  colors: {
    base: '#ffffff',
    main: '#f4f4f4',
    accent: '#42c2ff',
    paragraph: '#333333',
    heading: '#2a2a2a',
  },
};

export default extendTheme(theme);
