"use client";

const planos = [
  {
    periodo: "Mensal",
    nome: "Liber Classic",
    preco6h: "R$ 620",
    preco12h: "R$ 950",
    destaque: false,
    badge: null,
    prioridade: "◆ Prioridade 4",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional básico", extra: false },
      { label: "Prioridade 4 no agendamento", extra: false },
    ],
  },
  {
    periodo: "Trimestral",
    nome: "Liber Gold",
    preco6h: "R$ 560",
    preco12h: "R$ 860",
    destaque: false,
    badge: null,
    prioridade: "◆◆ Prioridade 3",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional", extra: false },
      { label: "Protocolos de depilação", extra: false },
      { label: "Grupo VIP", extra: false },
      { label: "Prioridade 3 no agendamento", extra: false },
    ],
  },
  {
    periodo: "Semestral",
    nome: "Liber Platinum",
    preco6h: "R$ 495",
    preco12h: "R$ 760",
    destaque: true,
    badge: "Mais escolhido",
    prioridade: "◆◆◆ Prioridade 2",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional", extra: false },
      { label: "Protocolos de depilação", extra: false },
      { label: "Protocolos de clareamento", extra: false },
      { label: "Grupo VIP", extra: false },
      { label: "Prioridade 2 no agendamento", extra: false },
    ],
  },
  {
    periodo: "Anual",
    nome: "Liber Black",
    preco6h: "R$ 430",
    preco12h: "R$ 660",
    destaque: false,
    badge: null,
    prioridade: "◆◆◆◆ Prioridade 1 — Máxima",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional", extra: false },
      { label: "Protocolos de depilação", extra: false },
      { label: "Protocolos de clareamento", extra: false },
      { label: "Grupo VIP", extra: false },
      { label: "Prioridade 1 no agendamento", extra: false },
      { label: "Curso completo (R$500 de desconto)", extra: true },
      { label: "1 Mentoria VIP individual", extra: true },
    ],
  },
];

export default function PlanosSection() {
  return (
    <section id="planos" style={{ padding: "8rem 0", background: "#1A1A1A" }}>
      <div className="max-w-6xl mx-auto px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5" style={{ color: "#C9A55A" }}>
              <span style={{ display: "inline-block", width: 28, height: "0.5px", background: "#C9A55A" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
                Planos
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#FFFFFF" }}>
              Escolha seu<br />
              <em style={{ fontStyle: "italic", color: "#C9A55A" }}>plano ideal.</em>
            </h2>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "rgba(245,240,232,0.35)", maxWidth: 240, lineHeight: 1.7, textAlign: "right" }}>
            Todos os planos incluem locação da UltraFiber LM-L808A com opção de 6h ou 12h.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1.5px", background: "rgba(201,165,90,0.1)" }}>
          {planos.map((p) => (
            <div
              key={p.nome}
              className="flex flex-col transition-all duration-400 group"
              style={{
                background: p.destaque ? "#242424" : "#1A1A1A",
                padding: "2.8rem 2rem",
                borderTop: p.destaque ? "2px solid #C9A55A" : "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#2E2E2E";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = p.destaque ? "#242424" : "#1A1A1A";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {p.badge && (
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#0D0D0D", background: "#C9A55A", padding: "0.25rem 0.8rem", display: "inline-block", marginBottom: "1.5rem", alignSelf: "flex-start" }}>
                  {p.badge}
                </span>
              )}

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(201,165,90,0.55)", marginBottom: "0.8rem" }}>
                {p.periodo}
              </p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.7rem", fontWeight: 400, color: "#FFFFFF", marginBottom: "2rem" }}>
                {p.nome}
              </h3>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.3)", marginBottom: "0.3rem" }}>
                6 horas / mês
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 400, color: "#C9A55A" }}>
                  {p.preco6h}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: "rgba(245,240,232,0.4)" }}>/mês</span>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 300, color: "rgba(245,240,232,0.4)", marginBottom: "2rem" }}>
                ou <strong style={{ color: "rgba(201,165,90,0.7)", fontWeight: 400 }}>{p.preco12h}</strong> com 12h
              </p>

              <div style={{ height: "0.5px", background: "rgba(201,165,90,0.12)", marginBottom: "1.5rem" }} />

              <ul className="flex flex-col flex-1" style={{ listStyle: "none" }}>
                {p.features.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      color: f.extra ? "#E2C98A" : "rgba(245,240,232,0.55)",
                      padding: "0.45rem 0",
                      borderBottom: "0.5px solid rgba(245,240,232,0.05)",
                    }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        border: `0.5px solid ${f.extra ? "#C9A55A" : "rgba(201,165,90,0.4)"}`,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: f.extra ? "radial-gradient(circle, rgba(201,165,90,0.4) 0%, transparent 70%)" : "radial-gradient(circle, rgba(201,165,90,0.15) 0%, transparent 70%)",
                        display: "inline-block",
                      }}
                    />
                    {f.label}
                  </li>
                ))}
              </ul>

              <p style={{ marginTop: "1.5rem", fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.25)" }}>
                {p.prioridade}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
