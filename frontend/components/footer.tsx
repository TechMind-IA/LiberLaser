export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem 0",
        borderTop: "0.5px solid rgba(201,165,90,0.1)",
        background: "#0D0D0D",
      }}
    >
      <div className="max-w-6xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C9A55A",
            }}
          >
            Liber <em style={{ fontStyle: "italic", fontWeight: 300 }}>Laser</em> Academy
          </div>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.2)",
            }}
          >
            Locação · Educação · Tecnologia
          </p>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(245,240,232,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} Liber Laser Academy
          </p>
        </div>
      </div>
    </footer>
  );
}
