"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-8"
      style={{ background: "#0D0D0D" }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,165,90,.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(201,165,90,.05) 0%, transparent 60%)",
        }}
      />
      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[700, 1100].map((size) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "0.5px solid rgba(201,165,90,.08)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <p
        className="text-xs font-medium tracking-widest uppercase mb-8 animate-fade-up"
        style={{ color: "#C9A55A", letterSpacing: "0.32em" }}
      >
        Locação · Educação · Tecnologia
      </p>

      <h1
        className="font-serif text-white leading-none animate-fade-up"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 300,
          animationDelay: "0.2s",
        }}
      >
        Liber
        <br />
        <em style={{ color: "#C9A55A" }}>Laser Academy</em>
      </h1>

      <p
        className="text-xs font-medium uppercase tracking-widest mt-6 animate-fade-up"
        style={{
          color: "rgba(245,240,232,.4)",
          letterSpacing: "0.3em",
          animationDelay: "0.4s",
        }}
      >
        Transformando tecnologia em faturamento real
      </p>

      <p
        className="mt-10 text-base font-light max-w-md leading-relaxed animate-fade-up"
        style={{
          color: "rgba(245,240,232,.55)",
          animationDelay: "0.6s",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Alugamos equipamentos de laser e formamos profissionais para que cada
        sessão seja convertida em resultado financeiro de verdade.
      </p>

      <div
        className="mt-12 flex gap-5 items-center animate-fade-up"
        style={{ animationDelay: "0.8s" }}
      >
        <a
          href="#planos"
          className="text-xs font-medium uppercase tracking-wider px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            letterSpacing: "0.14em",
            background: "#C9A55A",
            color: "#0D0D0D",
          }}
        >
          Ver os Planos
        </a>
        <a
          href="#sobre"
          className="text-xs font-medium uppercase tracking-wider px-10 py-4 transition-all duration-300"
          style={{
            letterSpacing: "0.14em",
            color: "rgba(245,240,232,.6)",
            border: "0.5px solid rgba(245,240,232,.2)",
          }}
        >
          Conheça a Liber
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(245,240,232,.3)", letterSpacing: "0.24em" }}
        >
          Explore
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(201,165,90,.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}
