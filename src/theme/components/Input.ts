import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["field", "element", "addon"]);

type InputSize = "sm" | "md";

interface ExtendedDefaultProps {
  size?: InputSize | undefined;
  variant?: "outline" | undefined;
  colorScheme?: string | undefined;
  focusBorderColor?: string | undefined;
  errorBorderColor?: string | undefined;
  height?: number;
}

export const InputStyle = helpers.defineMultiStyleConfig({
  sizes: {
    sm: {
      field: {
        _placeholder: { fontSize: "xs" },
        fontSize: "xs",
      },
    },

    md: {
      field: {
        borderRadius: "sm",
        _placeholder: { fontSize: "xs" },
        fontSize: "xs",
        height: 9,
        htmlSize: 9,
      },
    },
  },

  defaultProps: {
    size: "md",
    height: 9,
    focusBorderColor: "main.500",
    errorBorderColor: "danger.700",
  } as ExtendedDefaultProps,
});
