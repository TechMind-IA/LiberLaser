export default function Footer() {
  return (
    <footer style={{ background: "#F5EDE2", padding: "2.5rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(201,165,90,.15)", fontFamily: "'Jost', sans-serif", flexWrap: "wrap" as const, gap: "1rem" }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: ".95rem", fontWeight: 600, color: "#C9A55A" }}>
        Liber <em style={{ fontStyle: "italic", fontWeight: 400 }}>Laser</em> Academy
      </div>
      <p style={{ fontSize: ".75rem", fontWeight: 400, color: "#8A6548", letterSpacing: ".08em" }}>
        Locação · Educação · Tecnologia
      </p>
      <p style={{ fontSize: ".75rem", fontWeight: 400, color: "#8A6548", letterSpacing: ".06em" }}>
        © {new Date().getFullYear()} Liber Laser Academy
      </p>
    </footer>
  );
}
