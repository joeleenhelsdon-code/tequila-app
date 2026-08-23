import type { Metadata } from "next";
import TequilaFiClerkProvider from "./clerk-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tequilafi.com"),
  title: {
    default: "TequilaFi — Discover, Taste and Track Tequila",
    template: "%s | TequilaFi",
  },
  description: "Explore tequila production details, discover bottles, record tasting notes, build your personal shelf and grow your global tequila passport.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: ["tequila app", "tequila guide", "tequila tasting notes", "tequila collection", "tequila NOM", "TequilaFi"],
  openGraph: {
    type: "website",
    url: "https://www.tequilafi.com/",
    siteName: "TequilaFi",
    title: "TequilaFi — Discover, Taste and Track Tequila",
    description: "Know what you're drinking. Build your global tequila passport.",
    images: [{ url: "https://tequilish.fcbzzqm7dr.chatgpt.site/og.png", width: 1731, height: 908, alt: "TequilaFi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TequilaFi — Discover, Taste and Track Tequila",
    description: "Know what you're drinking. Build your global tequila passport.",
    images: ["https://tequilish.fcbzzqm7dr.chatgpt.site/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.tequilafi.com/#website",
      url: "https://www.tequilafi.com/",
      name: "TequilaFi",
      description: "A global tequila discovery, tasting journal and collection app.",
      sameAs: ["https://www.youtube.com/@tequilafi"],
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.tequilafi.com/#app",
      url: "https://www.tequilafi.com/",
      name: "TequilaFi",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Any",
      description: "Discover tequila production details, record tasting notes and build a personal tequila passport.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <TequilaFiClerkProvider>
          {children}
        </TequilaFiClerkProvider>
      </body>
    </html>
  );
}
