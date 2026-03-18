export default function CtaSection() {
  return (
    <section
      id="cta"
      className="relative text-center overflow-hidden"
      style={{ padding: "10rem 0", background: "#1A1A1A" }}
    >
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,165,90,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-10">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "4rem",
            color: "rgba(201,165,90,0.12)",
            marginBottom: "2rem",
            display: "block",
            fontStyle: "italic",
          }}
        >
          Liber
        </span>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          Pronta para transformar<br />
          tecnologia em{" "}
          <em style={{ fontStyle: "italic", color: "#C9A55A" }}>faturamento?</em>
        </h2>

        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "rgba(245,240,232,0.45)",
            marginBottom: "3rem",
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.8,
          }}
        >
          Fale com a nossa equipe agora mesmo e descubra qual plano é ideal para a sua clínica.
        </p>

        <div className="flex justify-center gap-5 flex-wrap">
          <a
            href="https://wa.me/5531988280047"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0D0D0D",
              background: "#C9A55A",
              padding: "0.9rem 2.4rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Quero começar agora
          </a>
          <a
            href="#planos"
            className="transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.6)",
              background: "transparent",
              padding: "0.9rem 2.4rem",
              border: "0.5px solid rgba(245,240,232,0.2)",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver os planos
          </a>
        </div>
      </div>
    </section>
  );
}
