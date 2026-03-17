import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  'Acesso imediato a todos os cursos',
  'Certificado incluso em cada curso',
  'Suporte por 12 meses',
  'Atualizações gratuitas'
]

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-background leading-tight text-balance">
            Pronta para transformar sua carreira na estética?
          </h2>
          <p className="mt-6 text-lg text-background/70 text-pretty">
            Junte-se a milhares de profissionais que já estão se destacando no mercado 
            com nossos cursos especializados.
          </p>

          {/* Features */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-background">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/cadastro">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base"
              >
                Criar minha conta gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-background/50">
              Sem compromisso. Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
