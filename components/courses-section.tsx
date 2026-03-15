import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, BarChart, ArrowRight } from 'lucide-react'

const featuredCourses = [
  {
    title: 'Limpeza de Pele Profissional',
    description: 'Aprenda todas as técnicas de limpeza de pele profissional.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    duration: '8 horas',
    level: 'Iniciante',
    instructor: 'Dra. Ana Silva'
  },
  {
    title: 'Design de Sobrancelhas',
    description: 'Domine a arte do design de sobrancelhas com técnicas avançadas.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    duration: '6 horas',
    level: 'Intermediário',
    instructor: 'Maria Oliveira'
  },
  {
    title: 'Massagem Facial Rejuvenescedora',
    description: 'Técnicas de massagem facial para rejuvenescimento e relaxamento.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop',
    duration: '10 horas',
    level: 'Avançado',
    instructor: 'Dr. Carlos Santos'
  }
]

export function CoursesSection() {
  return (
    <section id="cursos" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium">Nossos Cursos</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-foreground text-balance">
              Cursos em destaque
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl text-pretty">
              Descubra nossos cursos mais populares e comece sua jornada de transformação profissional.
            </p>
          </div>
          <Link href="/cadastro">
            <Button variant="outline" className="shrink-0">
              Ver todos os cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div 
              key={index}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {course.description}
                </p>
                
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Por {course.instructor}
                  </span>
                  <Link href="/cadastro">
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
                      Acessar
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
