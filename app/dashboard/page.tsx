"use client"

import { useAuth } from '@/contexts/auth-context'
import { CourseCard } from '@/components/dashboard/course-card'
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react'

// Mock data - will be replaced with Strapi data
const courses = [
  {
    id: 'limpeza-de-pele-profissional',
    title: 'Limpeza de Pele Profissional',
    description: 'Aprenda todas as técnicas de limpeza de pele profissional, desde a preparação até os cuidados pós-procedimento.',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    duration: '8 horas',
    level: 'iniciante',
    instructor: 'Dra. Ana Silva',
    lessonsCount: 24,
    progress: 65
  },
  {
    id: 'design-de-sobrancelhas',
    title: 'Design de Sobrancelhas',
    description: 'Domine a arte do design de sobrancelhas com técnicas avançadas de visagismo e aplicação.',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    duration: '6 horas',
    level: 'intermediario',
    instructor: 'Maria Oliveira',
    lessonsCount: 18,
    progress: 30
  },
  {
    id: 'massagem-facial-rejuvenescedora',
    title: 'Massagem Facial Rejuvenescedora',
    description: 'Técnicas de massagem facial para rejuvenescimento e relaxamento, incluindo drenagem linfática.',
    thumbnail: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop',
    duration: '10 horas',
    level: 'avancado',
    instructor: 'Dr. Carlos Santos',
    lessonsCount: 32,
    progress: 0
  },
  {
    id: 'micropigmentacao-labial',
    title: 'Micropigmentação Labial',
    description: 'Curso completo de micropigmentação labial com técnicas modernas e seguras.',
    thumbnail: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=400&fit=crop',
    duration: '12 horas',
    level: 'avancado',
    instructor: 'Juliana Costa',
    lessonsCount: 40,
    progress: 0
  }
]

const stats = [
  { icon: BookOpen, label: 'Cursos em andamento', value: '2' },
  { icon: Clock, label: 'Horas estudadas', value: '12h' },
  { icon: Award, label: 'Certificados', value: '1' },
  { icon: TrendingUp, label: 'Progresso geral', value: '48%' }
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">
          Olá, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Continue de onde você parou e avance em seus estudos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="p-4 lg:p-6 bg-card rounded-xl border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Continue Aprendendo</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.filter(c => c.progress > 0).map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>

      {/* All Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Todos os Cursos</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>
    </div>
  )
}
