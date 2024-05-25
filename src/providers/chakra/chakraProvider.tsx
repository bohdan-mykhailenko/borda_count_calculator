"use client";

import { PropsWithChildren } from "react";
import { ChakraProvider as BaseChakraProvider, theme } from "@chakra-ui/react";

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
