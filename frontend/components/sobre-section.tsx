export default function SobreSection() {
  const stats = [
    { number: "808", label: "nm · Diodo Premium" },
    { number: "4", label: "Planos disponíveis" },
    { number: "2", label: "Tratamentos em 1" },
    { number: "∞", label: "Potencial de renda" },
  ];

  return (
    <section
      id="sobre"
      className="relative"
      style={{ padding: "10rem 0 8rem", background: "#0D0D0D" }}
    >
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Text */}
          <div>
            <div
              className="flex items-center gap-3 mb-5"
              style={{ color: "#C9A55A" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: "0.5px",
                  background: "#C9A55A",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                Sobre nós
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#FFFFFF",
              }}
            >
              Alugar é só
              <br />
              o <em style={{ fontStyle: "italic", color: "#C9A55A" }}>começo.</em>
            </h2>

            <p
              className="mt-8 leading-loose"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 300,
                color: "rgba(245,240,232,0.6)",
              }}
            >
              A Liber Laser Academy nasceu para apoiar clínicas e profissionais
              que querem trabalhar com depilação e clareamento a laser de forma
              consciente e lucrativa.
            </p>
            <p
              className="mt-5 leading-loose"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 300,
                color: "rgba(245,240,232,0.6)",
              }}
            >
              Mais do que disponibilizar a máquina, acompanhamos cada etapa do
              processo. Orientamos, treinamos e organizamos o uso do laser para
              que ele se torne uma fonte real de renda.
            </p>

            <div
              className="mt-10"
              style={{ borderLeft: "0.5px solid #C9A55A", paddingLeft: "2rem" }}
            >
              <blockquote
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(245,240,232,0.75)",
                  lineHeight: 1.6,
                }}
              >
                "O que realmente importa é ver nossos parceiros evoluindo e
                prosperando."
              </blockquote>
            </div>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2"
            style={{ gap: "1.5px", background: "rgba(201,165,90,0.12)" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center"
                style={{ background: "#1A1A1A", padding: "2.5rem" }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#C9A55A",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {s.number}
                </span>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.4)",
                    marginTop: "0.6rem",
                    display: "block",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
