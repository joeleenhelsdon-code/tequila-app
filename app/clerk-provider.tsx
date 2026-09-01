"use client";

import { ClerkProvider } from "@clerk/clerk-react";
import { useEffect, useState, type ReactNode } from "react";

export default function TequilaFiClerkProvider({ children }: { children: ReactNode }) {
  const [publishableKey, setPublishableKey] = useState(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (publishableKey) return;
    fetch("/api/clerk-config", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((config: { publishableKey?: string }) => {
        if (config.publishableKey) setPublishableKey(config.publishableKey);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, [publishableKey]);

  if (!publishableKey) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "system-ui", background: "#f7f3ea", color: "#17382c" }}>
        <div style={{ textAlign: "center" }}>
          <img src="/brand/tequilafi-gold-logo.jpg" alt="Tequilafi" width={240} height={80} style={{ display: "block", margin: "0 auto 20px", borderRadius: 8 }} />
          <p>{failed ? "TequilaFi login is being configured. Please refresh shortly." : "Opening TequilaFi…"}</p>
        </div>
      </main>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} appearance={{ layout: { logoImageUrl: "/brand/tequilafi-gold-logo.jpg", logoLinkUrl: "/" } }}>
      {children}
    </ClerkProvider>
  );
}
