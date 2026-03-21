export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary border-t border-[var(--color-border)]/20 px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">

          {/* Brand */}
          <div>
            <p className="font-serif text-accent text-2xl font-semibold mb-3">
              Liber <em className="font-normal not-italic">Laser</em> Academy
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Locação · Educação · Tecnologia
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-bg text-[0.68rem] font-bold tracking-[0.22em] uppercase mb-5">
              Contato
            </h4>
            <ul className="space-y-2.5 text-muted text-sm">
              <li>contato@liberlaser.com.br</li>
              <li>Brasil</li>
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-bg text-[0.68rem] font-bold tracking-[0.22em] uppercase mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre',         href: '#sobre' },
                { label: 'Serviços',      href: '#servicos' },
                { label: 'Diferenciais',  href: '#diferenciais' },
                { label: 'Planos',        href: '#planos' },
                { label: 'Área do aluno', href: '/login' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted text-sm hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-bg/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted/60 text-xs tracking-wide">
            © {year} Liber Laser Academy. Todos os direitos reservados.
          </p>
          <a
            href="https://wa.me/55"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/60 text-xs tracking-[0.12em] uppercase hover:text-accent transition-colors duration-200"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </div>
    </footer>
  )
}
