import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand1: "#4529E6",
  brand2: "#5126ea",
  brand3: "#b0a6f0",
  brand4: "#edeafd",

  grey0: "#0b0d0d",
  grey1: "#212529",
  grey2: "#495057",
  grey3: "#868e96",
  grey4: "#adb5bd",
  grey5: "#ced4da",
  grey6: "#dee2e6",
  grey7: "#e9ecef",
  grey8: "#f1f3f5",
  grey9: "#f8f9fa",
  grey10: "#fdfdfd",
  white: "#ffffff",

  alert1: "#cd2b31",
  alert2: "#fdd8d8",
  alert3: "#ffe5e5",

  sucess1: "#18794e",
  sucess2: "#ccebd7",
  sucess3: "#ddf3e4 ",

  random1: "#e34d8c",
  random2: "#c04277",
  random3: "#7d2a4d",
  random4: "#7000ff",
  random5: "#6200e3",
  random6: "#36007d",
  random7: "#349974",
  random8: "#2a7d5f",
  random9: "#153d2e",
  random10: "#6100ff",
  random11: "#5700e3",
  random12: "#30007d ",
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

const breakpoints = {
  cel: "0",
  desk: "24em",
};

export const theme = extendTheme({ colors, fonts, fontSizes, breakpoints });
