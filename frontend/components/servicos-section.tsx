"use client";

const servicos = [
  {
    num: "01",
    title: "Depilação a laser",
    desc: "Tratamento recorrente com alta rotatividade. Sessões rápidas, seguras e protocolos organizados para maximizar a agenda e gerar receita previsível.",
    tags: ["Alta recorrência", "808 nm", "Agenda cheia"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A55A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Clareamento a laser",
    desc: "Serviço de alto valor percebido e baixo custo operacional. Diferencial que eleva o ticket médio e posiciona sua clínica em um segmento premium.",
    tags: ["Alto ticket", "Diferencial", "Premium"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A55A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

export default function ServicosSection() {
  return (
    <section id="servicos" style={{ padding: "6rem 5%", background: "#FBF7F2", fontFamily: "'Jost', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", marginBottom: "3rem" }}>
        <div>
          <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: ".7rem" }}>
            <span style={{ display: "block", width: 20, height: 1.5, background: "#C9A55A", flexShrink: 0 }} />
            Serviços
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "#1E0F05" }}>
            Dois tratamentos.<br />
            <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>Infinitas</em> possibilidades.
          </h2>
        </div>
        <p style={{ fontSize: ".9rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8 }}>
          A tecnologia 808 nm permite oferecer dois serviços de alta procura e alto valor percebido, ampliando seu portfólio sem elevar os custos operacionais.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(201,165,90,.15)" }}>
        {servicos.map((s) => (
          <div
            key={s.num}
            style={{ background: "#FFFDF9", padding: "3rem", transition: "background .3s", cursor: "default" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5EDE2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFDF9")}
          >
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: ".75rem", color: "#C9A55A", fontWeight: 600, marginBottom: "1.4rem" }}>{s.num}</div>
            <div style={{ width: 46, height: 46, border: "1.5px solid rgba(201,165,90,.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem" }}>
              {s.icon}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.45rem", fontWeight: 600, color: "#1E0F05", marginBottom: ".8rem" }}>{s.title}</h3>
            <p style={{ fontSize: ".9rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8 }}>{s.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: ".5rem", marginTop: "1.5rem" }}>
              {s.tags.map((tag) => (
                <span key={tag} style={{ fontSize: ".62rem", fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase" as const, color: "#A6823A", background: "rgba(201,165,90,.1)", padding: ".28rem .8rem" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}