import { Stack, Text, HStack, Link as CLink } from "@chakra-ui/react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";
import React from "react";

export const Footer = () => {
  return (
    <Stack spacing={4} align="center" py={5} bgColor="main">
      <Link to="/">
        <HStack _hover={{ opacity: 0.6 }} fontSize="2xl">
          <FontAwesomeIcon icon={faHouse} />
          <Text>Home</Text>
        </HStack>
      </Link>

      <Text fontSize="sm">
        Powered by{" "}
        <CLink href="https://www.gatsbyjs.com/">
          Gatsby.js
          <ExternalLinkIcon mx={1} />
        </CLink>
        {", "}
        <CLink href="https://chakra-ui.com/">
          Chakra UI
          <ExternalLinkIcon mx={1} />
        </CLink>
        {", "}
        <CLink href="https://microcms.io/">
          microCMS
          <ExternalLinkIcon mx={1} />
        </CLink>
        {", "}
        <CLink href="https://fontawesome.com/">
          Font Awesome
          <ExternalLinkIcon mx={1} />
        </CLink>
        {", "}
        <CLink href="https://www.npmjs.com/package/html-react-parser">
          html-react-parser
          <ExternalLinkIcon mx={1} />
        </CLink>
        .
      </Text>

      <Text fontSize="sm">© 2022 GrowUp-Haruno</Text>
    </Stack>
  );
};
