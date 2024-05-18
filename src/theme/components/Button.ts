import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
  color: "white",
  backgroundColor: "main.500",
  fontSize: "xs",
  _hover: {
    backgroundColor: "main.700",
  },
  _disabled: {
    _hover: { backgroundColor: "main.600" },
    opacity: 0.5,
    cursor: "default",
  },
});

export const ButtonStyle = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    size: "sm",
  },
});
