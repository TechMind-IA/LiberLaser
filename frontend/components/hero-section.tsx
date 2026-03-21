"use client";

// Coloque o arquivo de vídeo na pasta /public do projeto
// e ajuste o nome abaixo conforme necessário.
// Exemplo: se o arquivo se chama "institucional.mp4", use "/institucional.mp4"
const VIDEO_SRC = "/video1.mp4";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        background: "#FBF7F2",
        padding: "7rem 5% 5rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
        borderBottom: "1px solid rgba(201,165,90,.15)",
        fontFamily: "'Jost', sans-serif",
        height: '890px'
      }}
    >
      {/* ── Texto ── */}
      <div>
        <p
          style={{
            fontSize: ".72rem",
            fontWeight: 600,
            letterSpacing: ".28em",
            textTransform: "uppercase" as const,
            color: "#C9A55A",
            marginBottom: "1.4rem",
            display: "flex",
            alignItems: "center",
            gap: ".7rem",
          }}
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "#C9A55A", flexShrink: 0 }} />
          Locação · Educação · Tecnologia
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1E0F05",
            marginBottom: "1.5rem",
          }}
        >
          Tecnologia laser<br />
          a serviço do seu<br />
          <em style={{ color: "#C9A55A", fontStyle: "italic", fontWeight: 400 }}>negócio.</em>
        </h1>

        <p
          style={{
            fontSize: ".97rem",
            fontWeight: 400,
            color: "#4A2E18",
            lineHeight: 1.8,
            maxWidth: 440,
          }}
        >
          Alugamos equipamentos de laser profissional e formamos profissionais
          para que cada sessão se converta em resultado financeiro real — com
          suporte, método e segurança.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const, marginTop: "2.2rem" }}>
          <a
            href="#planos"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".8rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              padding: ".85rem 2rem",
              background: "#C9A55A",
              color: "#FFFDF9",
            }}
          >
            Conhecer os planos
          </a>
          <a
            href="https://wa.me/55"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".8rem",
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              padding: ".85rem 2rem",
              color: "#4A2E18",
              border: "1.5px solid rgba(74,46,24,.25)",
            }}
          >
            Falar com a equipe
          </a>
        </div>
      </div>

      {/* ── Vídeo local ── */}
      <div style={{ position: "relative" as const }}>
        {/* Moldura decorativa deslocada */}
        <div
          style={{
            position: "absolute" as const,
            inset: 0,
            transform: "translate(12px, 12px)",
            border: "1.5px solid rgba(201,165,90,.3)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Player */}
        <div style={{ position: "relative" as const, zIndex: 1, lineHeight: 0 }}>
          <video
            src={VIDEO_SRC}
            controls
            playsInline
            style={{
              width: "100%",
              display: "block",
              background: "#1E0F05",
            }}
          >
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>

        {/* Label */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: ".72rem",
            fontWeight: 600,
            letterSpacing: ".18em",
            textTransform: "uppercase" as const,
            color: "#8A6548",
            textAlign: "center" as const,
          }}
        >
          Conheça a Liber Laser Academy
        </p>
      </div>
    </section>
  );
}
