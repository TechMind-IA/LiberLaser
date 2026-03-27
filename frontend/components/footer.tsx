export default function Footer() {
  const year = new Date().getFullYear()

  const navLinks = [
    { label: 'Sobre',         href: '#sobre' },
    { label: 'Serviços',      href: '#servicos' },
    { label: 'Diferenciais',  href: '#diferenciais' },
    { label: 'Planos',        href: '#planos' },
    { label: 'Área do aluno', href: '/login' },
  ]

  return (
    <footer className="bg-bg px-6 sm:px-10 lg:px-16 pt-4 sm:pt-16 lg:pt-20 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Liber Laser Academy"
              className="h-20 w-auto object-contain mb-5"
            />
            <p className="text-primary/60 text-xs leading-relaxed">
              Transformando tecnologia laser em faturamento real para clínicas e profissionais de estética.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-primary/60 text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-5">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.label}>

                  <a href={item.href}
                    className="group flex items-center gap-2 text-primary/50 text-sm hover:text-accent transition-colors duration-200"
                  >
                    <span className="w-3 h-px bg-accent/30 shrink-0 group-hover:w-4 group-hover:bg-accent transition-all duration-200" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-primary/60 text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-5">
              Contato
            </h4>
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="text-accent/60 text-[2rem]">✉</span>
                <a href="mailto:contato@liberlaser.com.br" className="text-primary/60 text-ls leading-relaxed hover:text-accent transition-colors duration-200">
                  liberlaser20@gmail.com
                </a>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="flex gap-3 py-1">
              {[
                {
                  href: 'https://instagram.com',
                  label: 'Instagram',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  href: 'https://wa.me/55',
                  label: 'WhatsApp',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.625a.75.75 0 0 0 .921.908l5.902-1.547A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.964-1.358l-.355-.212-3.683.966.982-3.588-.232-.369A9.699 9.699 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-(--color-border) flex items-center justify-center text-secondary/50 hover:border-accent hover:text-accent transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div>
            <h4 className="text-primary/60 text-[0.7rem] font-bold tracking-[0.24em] uppercase mb-5">
              Localização
            </h4>
            <div className="border border-accent/15 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 z-10 px-3 py-1.5 bg-gradient-to-b from-bg/70 to-transparent pointer-events-none">
                <span className="text-accent/70 text-[0.55rem] font-bold tracking-[0.18em] uppercase">
                  Liber Laser Academy
                </span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1970718721765!2d-46.65429908502267!3d-23.56503718468176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="160"
                style={{ border: 0, display: 'block', filter: 'grayscale(60%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-primary/8 mb-2" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary/25 text-[0.65rem] tracking-wide">
            © {year} Liber Laser Academy. Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}
