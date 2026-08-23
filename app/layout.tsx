import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tequilify.com"),
  title: "Tequilify",
  description: "Discover how tequila was made, remember what you loved, and build your global agave passport.",
  openGraph: {
    title: "Tequilify",
    description: "Know what you're drinking. Build your global tequila passport.",
    images: [{ url: "https://tequilish.fcbzzqm7dr.chatgpt.site/og.png", width: 1731, height: 908, alt: "Tequilify" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tequilify",
    description: "Know what you're drinking. Build your global tequila passport.",
    images: ["https://tequilish.fcbzzqm7dr.chatgpt.site/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
