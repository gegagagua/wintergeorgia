/**
 * Root layout. Deliberately renders nothing — `[locale]/layout.tsx` owns
 * <html> and <body> so it can set lang per request.
 * Next 15 permits html/body in a nested layout when the root layout omits them.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
