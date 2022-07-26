import { extendTheme, ChakraTheme } from "@chakra-ui/react";
import "@fontsource/noto-sans-jp";

const theme: {
  styles: ChakraTheme["styles"];
  colors: ChakraTheme["colors"];
  fonts: ChakraTheme["fonts"];
} = {
  styles: {
    global: {
      "html, body": {
        color: "var(--chakra-colors-paragraph)",
        backgroundColor: "base",
        lineHeight: "tall",
      },
      a: {
        textDecoration: "none",
      },
    },
  },
  colors: {
    base: "#FFFFFF",
    main: "#EEF2F3",
    accent: "#87CEFA",
    paragraph: "#333333",
    heading: "#2a2a2a",
  },
  fonts: {
    body: "Noto Sans JP, sans-serif",
  },
};

export default extendTheme(theme);
