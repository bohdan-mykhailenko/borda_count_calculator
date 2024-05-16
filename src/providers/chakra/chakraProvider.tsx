"use client";

import { PropsWithChildren } from "react";
import { ChakraProvider as BaseChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme";

export const ChakraProvider = ({ children }: PropsWithChildren) => {
  return (
    <BaseChakraProvider
      resetCSS
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: "top",
          duration: 3000,
          isClosable: false,
        },
      }}
    >
      {children}
    </BaseChakraProvider>
  );
};
