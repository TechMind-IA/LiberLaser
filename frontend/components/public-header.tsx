"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 68,
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(255,253,249,.96)" : "#FFFDF9",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid rgba(201,165,90,.2)",
        transition: "all .3s",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Image
          src="/logo.png"
          alt="Liber Laser Academy"
          width={140}
          height={48}
          style={{ objectFit: "contain", display: "block" }}
          priority
        />
      </Link>

      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
        {[
          { label: "Sobre", href: "#sobre" },
          { label: "Serviços", href: "#servicos" },
          { label: "Diferenciais", href: "#diferenciais" },
          { label: "Planos", href: "#planos" },
        ].map((item) => (
          <li key={item.href}>
            <a href={item.href} style={{ fontFamily: "'Jost', sans-serif", fontSize: ".78rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#8A6548", textDecoration: "none" }}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
        <Link href="/login" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".75rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none", padding: ".55rem 1.3rem", color: "#4A2E18", border: "1.5px solid rgba(74,46,24,.25)" }}>
          Área do aluno
        </Link>
        <a href="https://wa.me/55" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".75rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none", padding: ".55rem 1.3rem", background: "#C9A55A", color: "#FFFDF9" }}>
          Falar no WhatsApp
        </a>
      </div>
    </nav>
  );
}
