"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [server, setServer] = React.useState(true);
  React.useEffect(() => {
    setServer(false);
  }, []);
  if (server) return <>{children}</>;
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
