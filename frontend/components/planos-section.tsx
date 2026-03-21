"use client";

const planos = [
  {
    periodo: "Mensal", nome: "Classic", preco6h: "R$ 620", preco12h: "R$ 950",
    destaque: false, badge: null, prioridade: "◆ Prioridade 4",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento básico", extra: false },
      { label: "Prioridade 4 no agendamento", extra: false },
    ],
  },
  {
    periodo: "Trimestral", nome: "Gold", preco6h: "R$ 560", preco12h: "R$ 860",
    destaque: false, badge: null, prioridade: "◆◆ Prioridade 3",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional", extra: false },
      { label: "Protocolos de depilação", extra: false },
      { label: "Grupo VIP", extra: false },
      { label: "Prioridade 3 no agendamento", extra: false },
    ],
  },
  {
    periodo: "Semestral", nome: "Platinum", preco6h: "R$ 495", preco12h: "R$ 760",
    destaque: true, badge: "Mais escolhido", prioridade: "◆◆◆ Prioridade 2",
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
    periodo: "Anual", nome: "Black", preco6h: "R$ 430", preco12h: "R$ 660",
    destaque: false, badge: null, prioridade: "◆◆◆◆ Prioridade 1 — Máxima",
    features: [
      { label: "Locação do equipamento", extra: false },
      { label: "Treinamento operacional", extra: false },
      { label: "Protocolos de depilação", extra: false },
      { label: "Protocolos de clareamento", extra: false },
      { label: "Grupo VIP", extra: false },
      { label: "Prioridade 1 no agendamento", extra: false },
      { label: "Curso completo (R$500 off)", extra: true },
      { label: "1 Mentoria VIP individual", extra: true },
    ],
  },
];

export default function PlanosSection() {
  return (
    <section id="planos" style={{ padding: "6rem 5%", background: "#FFFDF9", fontFamily: "'Jost', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", marginBottom: "3rem" }}>
        <div>
          <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: ".7rem" }}>
            <span style={{ display: "block", width: 20, height: 1.5, background: "#C9A55A", flexShrink: 0 }} />
            Planos
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "#1E0F05" }}>
            Escolha o plano<br />
            <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>ideal</em> para você.
          </h2>
        </div>
        <p style={{ fontSize: ".9rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8 }}>
          Todos os planos incluem a UltraFiber LM-L808A com 6 ou 12 horas mensais de uso, além de formação completa e suporte contínuo.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "rgba(201,165,90,.12)" }}>
        {planos.map((p) => (
          <div
            key={p.nome}
            style={{
              background: p.destaque ? "#F5EDE2" : "#FFFDF9",
              borderTop: p.destaque ? "2.5px solid #C9A55A" : "none",
              padding: "2.2rem 1.8rem",
              display: "flex",
              flexDirection: "column" as const,
              transition: "background .25s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FBF7F2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = p.destaque ? "#F5EDE2" : "#FFFDF9")}
          >
            {p.badge && (
              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" as const, background: "#C9A55A", color: "#FFFDF9", padding: ".25rem .8rem", display: "inline-block", marginBottom: ".9rem", alignSelf: "flex-start" }}>
                {p.badge}
              </span>
            )}
            <div style={{ fontSize: ".64rem", fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: ".4rem" }}>{p.periodo}</div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 600, color: "#1E0F05", marginBottom: "1.3rem" }}>{p.nome}</h3>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.7rem", fontWeight: 600, color: "#C9A55A" }}>{p.preco6h}</div>
            <div style={{ fontSize: ".75rem", fontWeight: 400, color: "#8A6548", margin: ".3rem 0 1.3rem" }}>ou {p.preco12h} com 12h/mês</div>
            <div style={{ height: 1, background: "rgba(201,165,90,.15)", marginBottom: "1.1rem" }} />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
              {p.features.map((f) => (
                <li key={f.label} style={{ fontSize: ".82rem", fontWeight: f.extra ? 600 : 400, color: f.extra ? "#A6823A" : "#4A2E18", padding: ".38rem 0", borderBottom: "1px solid rgba(30,15,5,.05)", display: "flex", alignItems: "center", gap: ".6rem" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", border: "1.5px solid #C9A55A", background: f.extra ? "#C9A55A" : "transparent", flexShrink: 0, display: "block" }} />
                  {f.label}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "1.1rem", fontSize: ".64rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#8A6548" }}>{p.prioridade}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
