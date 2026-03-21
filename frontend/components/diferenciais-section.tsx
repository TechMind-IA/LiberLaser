"use client";

const itens = [
  { num: "01", title: "Formação em depilação", desc: "Capacitação teórica e prática para atender com segurança e confiança desde o primeiro atendimento." },
  { num: "02", title: "Formação em clareamento", desc: "Protocolos exclusivos para ampliar o portfólio com procedimentos de alto valor percebido." },
  { num: "03", title: "Protocolos testados", desc: "Processos validados para padronizar atendimentos, reduzir erros e escalar os resultados." },
  { num: "04", title: "Suporte técnico", desc: "Acompanhamento contínuo durante todo o período de locação do equipamento." },
  { num: "05", title: "Grupo VIP", desc: "Comunidade exclusiva com conteúdos, atualizações e troca de experiências entre profissionais." },
  { num: "06", title: "Mentoria estratégica", desc: "Direcionamento personalizado para transformar tecnologia em resultado financeiro real." },
];

export default function DiferenciaisSection() {
  return (
    <section
      id="diferenciais"
      style={{ padding: "6rem 5%", background: "#F5EDE2", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start", fontFamily: "'Jost', sans-serif" }}
    >
      <div>
        <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: ".7rem" }}>
          <span style={{ display: "block", width: 20, height: 1.5, background: "#C9A55A", flexShrink: 0 }} />
          Diferenciais
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "#1E0F05", marginBottom: "1.2rem" }}>
          Mais do que<br />
          uma <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>máquina.</em>
        </h2>
        <p style={{ fontSize: ".9rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8 }}>
          Na Liber, você recebe um sistema completo para transformar a tecnologia em faturamento consistente.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(201,165,90,.12)" }}>
        {itens.map((item) => (
          <div
            key={item.num}
            style={{ background: "#F5EDE2", padding: "1.8rem 2rem", transition: "background .3s", cursor: "default" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDE0D0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F5EDE2")}
          >
            <div style={{ fontSize: ".7rem", fontWeight: 600, color: "#C9A55A", letterSpacing: ".08em", marginBottom: ".5rem" }}>{item.num}</div>
            <h4 style={{ fontFamily: "'Jost', sans-serif", fontSize: ".92rem", fontWeight: 600, color: "#1E0F05", marginBottom: ".35rem" }}>{item.title}</h4>
            <p style={{ fontSize: ".85rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
