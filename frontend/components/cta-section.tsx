export default function CtaSection() {
  return (
    <section
      style={{ padding: "7rem 5%", background: "#1E0F05", textAlign: "center" as const, position: "relative" as const, overflow: "hidden", fontFamily: "'Jost', sans-serif" }}
    >
      <div style={{ position: "absolute" as const, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(201,165,90,.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute" as const, width: 660, height: 660, borderRadius: "50%", border: "1px solid rgba(201,165,90,.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "8rem", fontWeight: 700, color: "rgba(201,165,90,.04)", position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap" as const, fontStyle: "italic", pointerEvents: "none", userSelect: "none" as const }}>
        Liber
      </div>

      <div style={{ position: "relative" as const, zIndex: 1 }}>
        <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".25em", textTransform: "uppercase" as const, color: "rgba(201,165,90,.75)", marginBottom: ".8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: ".7rem" }}>
          <span style={{ display: "block", width: 20, height: 1.5, background: "rgba(201,165,90,.75)", flexShrink: 0 }} />
          Próximo passo
        </p>

        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, color: "#FFFDF9", marginBottom: "1rem", lineHeight: 1.2 }}>
          Pronta para{" "}
          <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>transformar</em>
          <br />tecnologia em faturamento?
        </h2>

        <p style={{ fontSize: ".97rem", fontWeight: 400, color: "rgba(251,247,242,.55)", maxWidth: 440, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Fale com nossa equipe e descubra qual plano se encaixa melhor no momento da sua clínica.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
          <a href="https://wa.me/55" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".8rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none", padding: ".9rem 2.2rem", background: "#C9A55A", color: "#1E0F05", display: "inline-block", transition: "all .2s" }}>
            Falar no WhatsApp
          </a>
          <a href="#planos" style={{ fontFamily: "'Jost', sans-serif", fontSize: ".8rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" as const, textDecoration: "none", padding: ".9rem 2.2rem", border: "1.5px solid rgba(251,247,242,.15)", color: "rgba(251,247,242,.5)", display: "inline-block", transition: "all .2s" }}>
            Ver os planos
          </a>
        </div>
      </div>
    </section>
  );
}
