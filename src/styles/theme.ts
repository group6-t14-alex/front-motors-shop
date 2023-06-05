import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    1: "#4529E6",
    2: "#5126ea",
    3: "#b0a6f0",
    4: "#edeafd",
  },
  grey: {
    0: "#0b0d0d",
    1: "#212529",
    2: "#495057",
    3: "#868e96",
    4: "#adb5bd",
    5: "#ced4da",
    6: "#dee2e6",
    7: "#e9ecef",
    8: "#f1f3f5",
    9: "#f8f9fa",
    10: "#fdfdfd",
  },
  white: "#ffffff",
  alert: {
    1: "#cd2b31",
    2: "#fdd8d8",
    3: "#ffe5e5",
  },
  sucess: {
    1: "#18794e",
    2: "#ccebd7",
    3: "#ddf3e4 ",
  },
  random: {
    1: "#e34d8c",
    2: "#c04277",
    3: "#7d2a4d",
    4: "#7000ff",
    5: "#6200e3",
    6: "#36007d",
    7: "#349974",
    8: "#2a7d5f",
    9: "#153d2e",
    10: "#6100ff",
    11: "#5700e3",
    12: "#30007d ",
  },
};

const fonts = {
  heading: "Lexend, sans-serif",
  body: "Inter, sans-serif",
};

const fontSizes = {
  heading1: "2.75rem",
  heading2: "2.25rem",
  heading3: "2rem",
  heading4: "1.75rem",
  heading5: "1.5rem",
  heading6: "1.25rem",
  heading7: "1rem",
  body1: "1rem",
  body2: "0.875rem",
  buttonMedium: "0.875rem",
  button: "1rem",
  inputPlaceholder: "1rem",
  inputLabel: "0.875rem",
};

export const theme = extendTheme({ colors, fonts, fontSizes });
