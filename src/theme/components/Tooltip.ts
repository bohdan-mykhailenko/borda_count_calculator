import { defineStyleConfig } from "@chakra-ui/react";

export const TooltipStyle = defineStyleConfig({
  baseStyle: {
    hasArrow: true,
    color: "primary",
    background: "white",
    border: "1px solid",
    borderColor: "gray.300",
    borderRadius: "md",
    padding: 2,
  },
});
