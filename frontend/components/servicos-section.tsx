"use client";

const servicos = [
  {
    num: "01",
    title: "Depilação a Laser",
    description:
      "Tratamento recorrente que garante agenda cheia e faturamento previsível. Sessões rápidas, seguras e com alta rotatividade criam pacotes que fidelizam clientes e geram receita constante para sua clínica.",
    tags: ["Alta rotatividade", "Recorrência", "808 nm"],
    icon: (
      <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#C9A55A" strokeWidth={1.5}>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Clareamento a Laser",
    description:
      "Alto valor percebido com baixo custo operacional. Um procedimento complementar que aumenta o ticket médio, potencializa resultados e diferencia sua clínica com tecnologia avançada.",
    tags: ["Alto ticket", "Diferencial", "Resultados visíveis"],
    icon: (
      <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#C9A55A" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

export default function ServicosSection() {
  return (
    <section
      id="servicos"
      style={{ padding: "8rem 0", background: "#1A1A1A" }}
    >
      <div className="max-w-6xl mx-auto px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5" style={{ color: "#C9A55A" }}>
              <span style={{ display: "inline-block", width: 28, height: "0.5px", background: "#C9A55A" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
                O que oferecemos
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#FFFFFF" }}>
              Dois serviços.<br />
              <em style={{ fontStyle: "italic", color: "#C9A55A" }}>Infinitas</em> possibilidades.
            </h2>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.8 }}>
            A tecnologia 808 nm abre espaço para dois serviços de alto valor percebido,
            ampliando seu portfólio sem elevar custos operacionais.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5px", background: "rgba(201,165,90,0.1)" }}>
          {servicos.map((s) => (
            <div
              key={s.num}
              className="group relative overflow-hidden transition-colors duration-400"
              style={{ background: "#1A1A1A", padding: "3.5rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2A2A2A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
            >
              <span
                className="absolute top-8 right-10 transition-all duration-400"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "5rem", fontWeight: 300, color: "rgba(201,165,90,0.1)", lineHeight: 1 }}
              >
                {s.num}
              </span>

              <div
                className="flex items-center justify-center mb-8"
                style={{ width: 48, height: 48, border: "0.5px solid rgba(201,165,90,0.3)" }}
              >
                {s.icon}
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 400, color: "#FFFFFF", marginBottom: "1rem" }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.8 }}>
                {s.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-8">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                      color: "#C9A55A",
                      border: "0.5px solid rgba(201,165,90,0.25)",
                      padding: "0.3rem 0.9rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
