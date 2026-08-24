import type { Metadata } from "next";
import Link from "next/link";
import { additiveFreeBrands } from "../../../data/additive-free-brands";

export const metadata: Metadata = {
  title: "Additive-Free Tequila Guide | TequilaFi",
  description:
    "Explore 80 tequila brands that appeared in the Tequila Matchmaker on-site additive-free verification program.",
  alternates: { canonical: "https://www.tequilafi.com/guides/additive-free-tequila" },
};

export default function AdditiveFreeTequilaGuide() {
  return (
    <main className="guide-page">
      <nav className="guide-nav">
        <Link href="/">✺ TEQUILAFI</Link>
        <span>BETA RESOURCE</span>
      </nav>
      <header className="guide-hero">
        <p className="eyebrow">INDEPENDENT REFERENCE • 2026 BETA EDITION</p>
        <h1>Additive-Free<br />Tequila Guide</h1>
        <p>
          A practical reference to 80 brands that appeared in Tequila
          Matchmaker&apos;s on-site additive-free verification program.
        </p>
        <div className="guide-actions">
          <a
            className="primary guide-button"
            href="/guides/tequilafi-additive-free-tequila-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View or download PDF ↓
          </a>
          <Link className="secondary guide-button" href="/">
            Explore TequilaFi
          </Link>
        </div>
      </header>
      <section className="guide-intro">
        <div>
          <p className="eyebrow">THE REFERENCE LIST</p>
          <h2>{additiveFreeBrands.length} verified brands</h2>
        </div>
        <p>
          Verification status and production methods can change. Confirm
          current information before purchasing; inclusion here does not mean
          that TequilaFi independently certifies every expression or batch.
        </p>
      </section>
      <ol className="brand-directory">
        {additiveFreeBrands.map((brand) => <li key={brand}>{brand}</li>)}
      </ol>
      <footer className="guide-footer">
        <b>Explore responsibly.</b> For adults of legal drinking age.
      </footer>
    </main>
  );
}
