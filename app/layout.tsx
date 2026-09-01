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
    images: [{ url: "/brand/tequilafi-gold-logo.jpg", width: 1080, height: 360, alt: "Tequilafi gold and navy agave logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TequilaFi — Discover, Taste and Track Tequila",
    description: "Know what you're drinking. Build your global tequila passport.",
    images: ["https://www.tequilafi.com/brand/tequilafi-gold-logo.jpg"],
  },
  icons: {
    icon: [{ url: "/brand/tequilafi-favicon.png", sizes: "64x64", type: "image/png" }],
    shortcut: "/brand/tequilafi-favicon.png",
    apple: [{ url: "/brand/tequilafi-apple-icon.png", sizes: "180x180", type: "image/png" }],
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
