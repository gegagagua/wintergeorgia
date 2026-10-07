"use client";

import { createTheme } from "@mui/material/styles";

/**
 * MUI theme bridged to `design-tokens.css`. Palette values reference the CSS
 * custom properties set in that file, so swapping the theme ever and dark/light
 * mode happens through the single source of truth — not here.
 *
 * Keep this file minimal: only override what MUI defaults disagree with. If
 * you reach for a hex, add the token to design-tokens.css instead.
 */

const t = (name: string) => `var(--${name})`;

export const muiTheme = createTheme({
  // CSS variable-driven palette so dark/light flips with [data-theme].
  cssVariables: {
    cssVarPrefix: "mui",
    colorSchemeSelector: "data-theme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2C7FA8",
          dark: "#1F6286",
          light: "#3E97C4",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#D98436",
          dark: "#B86921",
          light: "#F2A65A",
          contrastText: "#0E1620",
        },
        error: { main: "#C0392F" },
        warning: { main: "#B8860B" },
        success: { main: "#2F7D53" },
        info: { main: "#2C7FA8" },
        background: {
          default: "#F2F5F7",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#0E1620",
          secondary: "#5A6A75",
        },
        divider: "#D6DEE4",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#5AAFD6",
          dark: "#2C7FA8",
          light: "#6FBFE3",
          contrastText: "#0E1620",
        },
        secondary: {
          main: "#E8A45F",
          dark: "#D98436",
          light: "#F2A65A",
          contrastText: "#0E1620",
        },
        error: { main: "#E0695E" },
        warning: { main: "#D9A82E" },
        success: { main: "#4CB077" },
        info: { main: "#5AAFD6" },
        background: {
          default: "#0B1219",
          paper: "#111C25",
        },
        text: {
          primary: "#E7EDF1",
          secondary: "#93A3AE",
        },
        divider: "#22323D",
      },
    },
  },
  typography: {
    fontFamily: t("font-sans"),
    h1: { fontFamily: t("font-serif"), fontWeight: 600, fontSize: 60, lineHeight: "64px" },
    h2: { fontFamily: t("font-serif"), fontWeight: 600, fontSize: 40, lineHeight: "48px" },
    h3: { fontFamily: t("font-serif"), fontWeight: 600, fontSize: 28, lineHeight: "36px" },
    h4: { fontWeight: 600, fontSize: 20, lineHeight: "28px" },
    body1: { fontSize: 17, lineHeight: "28px" },
    body2: { fontSize: 13, lineHeight: "20px" },
    button: { fontWeight: 500, textTransform: "none" },
  },
  shape: {
    // design-tokens.css: cards/tables are 14, inputs are 6. MUI uses a single
    // base; set the input radius and override cards per-component.
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 6,
          paddingInline: 20,
          minHeight: 44,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            backgroundColor: t("surface"),
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: t("line") },
          "& .MuiInputBase-input": { color: t("ink") },
          "& .MuiInputLabel-root": { color: t("ink-muted") },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", borderRadius: 14 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${t("line")}`,
          backgroundColor: t("surface"),
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 500 },
      },
    },
    MuiLink: {
      defaultProps: { underline: "hover" },
      styleOverrides: {
        root: { color: t("primary"), fontWeight: 500 },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: t("line") } },
    },
  },
});
