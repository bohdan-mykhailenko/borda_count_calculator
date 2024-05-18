import { type ThemeConfig, extendTheme } from "@chakra-ui/react";

import { TextStyle } from "./components/Text";
import { FormLabelStyle } from "./components/FormLabel";
import { InputStyle } from "./components/Input";
import { HeadingStyle } from "./components/Heading";
import { TabsStyle } from "./components/Tabs";
import { ButtonStyle } from "./components/Button";
import { TooltipStyle } from "./components/Tooltip";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const colors = {
  main100: "#F3BEB4",
  main200: "#FCEFEC",
  main500: "#E15C44",
  main600: "#D65741",
  main700: "#B44A36",

  premiumBorder: "#897ae3",
  premiumText: "linear-gradient(270deg, #897AE3 0%, #ED55C2 115.45%)",
  premiumHover: "linear-gradient(270deg, #DED9F7 0%, #FAD1EF 100%)",

  dark: "#101840",
  primary: "#474d66",
  muted: "#696f8c",

  warningColor700: "#FFB020",
  warningColor800: "rgb(153, 106, 19)",

  dangerColor700: "#D14343",
  dangerColor800: "#c41a1a",

  translucentBackground: "rgba(225, 92, 68, 0.1)",
  defaultBackground: "#ffffff",

  gray50: "#FAFBFF",
};

const fonts = {
  body: `"SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  heading: `"SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
};

export const theme = extendTheme({
  config,
  fonts,

  components: {
    Tooltip: TooltipStyle,
    Button: ButtonStyle,
    Input: InputStyle,
    FormLabel: FormLabelStyle,
    Text: TextStyle,
    Heading: HeadingStyle,
    Tabs: TabsStyle,
  },

  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
      },
      "html, body": {
        padding: 0,
        margin: 0,
        background: colors.defaultBackground,
        color: colors.primary,
      },

      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
  },

  colors: {
    main: {
      100: colors.main100,
      200: colors.main200,
      500: colors.main500,
      600: colors.main600,
      700: colors.main700,
    },
    premium: {
      border: colors.premiumBorder,
      text: colors.premiumText,
      hover: colors.premiumHover,
    },
    warning: {
      700: colors.warningColor700,
      800: colors.warningColor800,
    },
    danger: {
      700: colors.dangerColor700,
      800: colors.dangerColor800,
    },
    dark: colors.dark,
    primary: colors.primary,
    muted: colors.muted,
    gray: {
      50: colors.gray50,
    },
    translucent: {
      background: colors.translucentBackground,
    },
  },

  layerStyles: {
    premium: {
      bgGradient:
        "linear(to-l, rgb(137, 122, 227) 0%, rgb(237, 85, 194) 115.45%)",
    },
    overflowedText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    iconsList: {
      display: "flex",
      gap: 2,
      padding: 2,
      border: "1px solid",
      borderColor: "gray.300",
      background: "gray.50",
      borderRadius: "md",
    },
    modalButtonsContainer: {
      marginTop: 12,
      justifyContent: "flex-end",
      gap: 3,
    },
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  space: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    7.5: "1.875rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    30: "7.5rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tightest: "-0.001em",
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  breakpoints: {
    base: "0em", // 0px
    sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
    premd: "38em", // ~608px
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
  },
});
