"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-400"
      style={{
        padding: scrolled ? "0.9rem 4rem" : "1.25rem 4rem",
        background: scrolled ? "rgba(13,13,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(201,165,90,0.2)" : "none",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.4rem",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: "#C9A55A",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        Liber <em style={{ fontStyle: "italic", fontWeight: 300 }}>Laser</em>
      </Link>

      <ul className="hidden md:flex gap-10 list-none">
        {[
          { label: "Sobre", href: "#sobre" },
          { label: "Serviços", href: "#servicos" },
          { label: "Planos", href: "#planos" },
          { label: "FAQ", href: "#faq" },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="transition-colors duration-300 hover:text-yellow-400"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.6)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Área restrita */}
        <Link
          href="/login"
          className="transition-all duration-300"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.6)",
            border: "0.5px solid rgba(245,240,232,0.15)",
            padding: "0.6rem 1.4rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,165,90,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#C9A55A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.15)";
            (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.6)";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Área do Aluno
        </Link>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/55"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:-translate-y-px"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#0D0D0D",
            background: "#C9A55A",
            padding: "0.6rem 1.6rem",
            textDecoration: "none",
          }}
        >
          Falar no WhatsApp
        </a>
      </div>
    </nav>
  );
}
