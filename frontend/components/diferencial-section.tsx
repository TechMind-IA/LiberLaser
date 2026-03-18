"use client";

const itens = [
  { num: "01", title: "Formação em Depilação", desc: "Capacitação teórica e prática completa para atender com segurança e confiança." },
  { num: "02", title: "Formação em Clareamento", desc: "Protocolos exclusivos para ampliar seu portfólio com procedimentos de alto valor." },
  { num: "03", title: "Protocolos Testados", desc: "Processos organizados e validados para padronizar seus atendimentos e escalar." },
  { num: "04", title: "Suporte Técnico", desc: "Acompanhamento contínuo durante o uso para garantir segurança e resultados." },
  { num: "05", title: "Grupo VIP", desc: "Comunidade exclusiva de profissionais com conteúdos e troca de experiências." },
  { num: "06", title: "Mentoria Estratégica", desc: "Direcionamento para transformar tecnologia em resultado financeiro real e escalável." },
];

export default function DiferencialSection() {
  return (
    <section id="diferencial" style={{ padding: "8rem 0", background: "#0D0D0D" }}>
      <div className="max-w-6xl mx-auto px-10">
        <div className="flex items-center gap-3 mb-4" style={{ color: "#C9A55A" }}>
          <span style={{ display: "inline-block", width: 28, height: "0.5px", background: "#C9A55A" }} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
            Nosso diferencial
          </span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#FFFFFF" }}>
          Mais do que<br />
          uma <em style={{ fontStyle: "italic", color: "#C9A55A" }}>máquina.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16 items-start">
          {/* Intro */}
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "rgba(245,240,232,0.5)", lineHeight: 1.9 }}>
            Na Liber, você não recebe apenas um equipamento. Recebe orientação, clareza e
            direcionamento para transformar o laser em faturamento real.
          </p>

          {/* Items grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2" style={{ gap: "2px", background: "rgba(201,165,90,0.08)" }}>
            {itens.map((item) => (
              <div
                key={item.num}
                className="transition-colors duration-300"
                style={{ background: "#0D0D0D", padding: "2rem 2.5rem", borderBottom: "0.5px solid rgba(201,165,90,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#141414")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0D0D0D")}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.78rem", fontWeight: 400, color: "#C9A55A", letterSpacing: "0.08em", marginBottom: "0.8rem", display: "block" }}>
                  {item.num}
                </span>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "0.02em" }}>
                  {item.title}
                </h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 300, color: "rgba(245,240,232,0.45)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
