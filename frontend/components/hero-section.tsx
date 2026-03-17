import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Star, Users, Award } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Plataforma #1 em Estética</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-tight text-balance">
              Transforme sua carreira na{' '}
              <span className="text-primary">estética</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Aprenda com os melhores profissionais do mercado. Cursos completos, 
              certificados reconhecidos e suporte exclusivo para impulsionar sua carreira.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/cadastro">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base">
                  Começar Gratuitamente
                </Button>
              </Link>
              <Link href="#cursos">
                <Button size="lg" variant="outline" className="px-8 h-12 text-base border-border hover:bg-secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Cursos
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Users className="h-5 w-5" />
                  <span className="text-2xl font-bold">5.000+</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Alunos ativos</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Cursos disponíveis</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Avaliação média</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=1000&fit=crop"
                alt="Profissional de estética realizando procedimento"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Certificado</p>
                  <p className="text-sm text-muted-foreground">Reconhecido nacionalmente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
