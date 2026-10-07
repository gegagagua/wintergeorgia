"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { muiTheme } from "./theme";

/**
 * App-wide MUI provider. Wrapped in the root locale layout so every
 * MUI component inherits the brand theme and emotion cache is streamed
 * correctly in the App Router.
 */
export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={muiTheme} defaultMode="system">
        <CssBaseline enableColorScheme={false} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
