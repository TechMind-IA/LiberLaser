import { BookOpen, Clock, Award, Users, Video, HeadphonesIcon } from 'lucide-react'

const benefits = [
  {
    icon: Video,
    title: 'Aulas em Vídeo HD',
    description: 'Conteúdo gravado em alta qualidade com demonstrações práticas detalhadas.'
  },
  {
    icon: Clock,
    title: 'Acesso Vitalício',
    description: 'Estude no seu ritmo, quando e onde quiser, sem prazo de expiração.'
  },
  {
    icon: Award,
    title: 'Certificado Reconhecido',
    description: 'Certificação válida em todo território nacional após conclusão.'
  },
  {
    icon: BookOpen,
    title: 'Material Complementar',
    description: 'PDFs, apostilas e recursos extras para aprofundar seu conhecimento.'
  },
  {
    icon: Users,
    title: 'Comunidade Exclusiva',
    description: 'Acesso a grupo privado para networking e troca de experiências.'
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Dedicado',
    description: 'Equipe pronta para tirar suas dúvidas e auxiliar no aprendizado.'
  }
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium">Por que escolher a Beleza Academy</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
            Tudo que você precisa para se destacar no mercado
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Oferecemos uma experiência de aprendizado completa e diferenciada para 
            profissionais que buscam excelência na área de estética.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
