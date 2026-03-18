"use client";

const items = [
  "Deseja aumentar o faturamento mensal com serviços de alto valor percebido",
  "Busca uma nova fonte de renda sem investir alto na compra de equipamentos",
  "Quer oferecer depilação e clareamento a laser com boa margem de lucro",
  "Já atende estética, mas sente que está deixando dinheiro na mesa",
  "Busca formação profissional qualificada para trabalhar com segurança e clareza",
  "Precisa de orientação para transformar tecnologia em resultado financeiro real",
];

export default function ParaQuemSection() {
  return (
    <section id="paraquem" style={{ padding: "8rem 0", background: "#242424" }}>
      <div className="max-w-6xl mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5" style={{ color: "#C9A55A" }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
              Para quem é
            </span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#FFFFFF" }}>
            A Liber foi criada<br />
            para <em style={{ fontStyle: "italic", color: "#C9A55A" }}>você</em> que...
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: "1px", background: "rgba(201,165,90,0.1)" }}>
          {items.map((text, i) => (
            <div
              key={i}
              className="relative group transition-colors duration-300"
              style={{ background: "#242424", padding: "2.5rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2C2C2C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#242424")}
            >
              <span
                className="absolute top-9 right-8 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: "rgba(201,165,90,0.3)", fontSize: "1.1rem" }}
              >
                →
              </span>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "rgba(245,240,232,0.6)", lineHeight: 1.75 }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
