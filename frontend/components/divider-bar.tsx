"use client";

export default function DividerBar() {
  const items = [
    { title: "Locação profissional", sub: "Equipamento sem compra" },
    { title: "Formação completa", sub: "Depilação e clareamento" },
    { title: "Suporte contínuo", sub: "Durante todo o processo" },
  ];

  return (
    <div style={{ background: "#C9A55A", padding: "1.2rem 5%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, fontFamily: "'Jost', sans-serif" }}>
      {items.map((item) => (
        <div key={item.title} style={{ textAlign: "center" as const, padding: ".4rem" }}>
          <strong style={{ display: "block", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontWeight: 600, color: "#FFFDF9", marginBottom: ".2rem" }}>
            {item.title}
          </strong>
          <span style={{ fontSize: ".72rem", fontWeight: 500, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "rgba(255,253,249,.75)" }}>
            {item.sub}
          </span>
        </div>
      ))}
    </div>
  );
}