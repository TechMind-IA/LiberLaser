import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react'

const footerLinks = {
  cursos: [
    { label: 'Limpeza de Pele', href: '#' },
    { label: 'Design de Sobrancelhas', href: '#' },
    { label: 'Massagem Facial', href: '#' },
    { label: 'Micropigmentação', href: '#' }
  ],
  empresa: [
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Instrutores', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contato', href: '#contato' }
  ],
  suporte: [
    { label: 'Central de Ajuda', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Privacidade', href: '#' }
  ]
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' }
]

export function Footer() {
  return (
    <footer id="contato" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif font-bold">
                Beleza<span className="text-primary">Academy</span>
              </span>
            </Link>
            <p className="mt-4 text-background/70 max-w-sm leading-relaxed">
              Transformando carreiras na estética através de educação de qualidade 
              e conteúdo exclusivo dos melhores profissionais do mercado.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Cursos</h4>
            <ul className="space-y-3">
              {footerLinks.cursos.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Beleza Academy. Todos os direitos reservados.
          </p>
          <p className="text-sm text-background/50">
            Feito com carinho para profissionais de estética
          </p>
        </div>
      </div>
    </footer>
  )
}
