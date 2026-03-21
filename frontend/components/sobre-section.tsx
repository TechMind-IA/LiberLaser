export default function SobreSection() {
  return (
    <section
      id="sobre"
      style={{ padding: "6rem 5%", background: "#FFFDF9", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", fontFamily: "'Jost', sans-serif" }}
    >
      <div style={{ background: "#F5EDE2", height: 360, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,165,90,.15)", position: "relative" as const, overflow: "hidden" }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "6rem", fontWeight: 700, color: "rgba(201,165,90,.07)", position: "absolute" as const, fontStyle: "italic", letterSpacing: ".05em", userSelect: "none" as const }}>
          Liber
        </span>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: ".95rem", color: "#8A6548", fontStyle: "italic", fontWeight: 400, position: "relative" as const, zIndex: 1 }}>
          Liber Laser Academy
        </span>
      </div>

      <div>
        <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase" as const, color: "#C9A55A", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: ".7rem" }}>
          <span style={{ display: "block", width: 20, height: 1.5, background: "#C9A55A", flexShrink: 0 }} />
          Sobre nós
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, color: "#1E0F05", marginBottom: "1.2rem" }}>
          Alugar é só<br />
          o <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>começo.</em>
        </h2>

        <p style={{ fontSize: ".97rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8 }}>
          A Liber Laser Academy nasceu para apoiar clínicas e profissionais que desejam trabalhar com laser de forma consciente, segura e lucrativa.
        </p>
        <p style={{ fontSize: ".97rem", fontWeight: 400, color: "#4A2E18", lineHeight: 1.8, marginTop: "1rem" }}>
          Mais do que um equipamento, entregamos orientação, método e acompanhamento para que cada parceiro transforme a tecnologia em uma fonte real de renda.
        </p>

        <div style={{ borderLeft: "3px solid #C9A55A", paddingLeft: "1.4rem", marginTop: "2rem" }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.05rem", fontStyle: "italic", fontWeight: 400, color: "#4A2E18", lineHeight: 1.65 }}>
            "O que realmente importa é ver nossos parceiros evoluindo e prosperando."
          </p>
        </div>
      </div>
    </section>
  );
}