"use client"

import { CourseCard } from '@/components/dashboard/course-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

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
  },
  {
    id: 'depilacao-a-laser',
    title: 'Depilação a Laser',
    description: 'Fundamentos e práticas de depilação a laser com equipamentos modernos.',
    thumbnail: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&h=400&fit=crop',
    duration: '15 horas',
    level: 'avancado',
    instructor: 'Dra. Patricia Lima',
    lessonsCount: 45,
    progress: 0
  },
  {
    id: 'maquiagem-profissional',
    title: 'Maquiagem Profissional',
    description: 'Técnicas de maquiagem para eventos, editorial e dia a dia.',
    thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
    duration: '20 horas',
    level: 'intermediario',
    instructor: 'Amanda Ferreira',
    lessonsCount: 60,
    progress: 0
  }
]

export default function CursosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = !selectedLevel || course.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">
          Meus Cursos
        </h1>
        <p className="mt-1 text-muted-foreground">
          Explore todos os cursos disponíveis na plataforma.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedLevel === null ? "default" : "outline"}
            onClick={() => setSelectedLevel(null)}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={selectedLevel === 'iniciante' ? "default" : "outline"}
            onClick={() => setSelectedLevel('iniciante')}
            size="sm"
          >
            Iniciante
          </Button>
          <Button
            variant={selectedLevel === 'intermediario' ? "default" : "outline"}
            onClick={() => setSelectedLevel('intermediario')}
            size="sm"
          >
            Intermediário
          </Button>
          <Button
            variant={selectedLevel === 'avancado' ? "default" : "outline"}
            onClick={() => setSelectedLevel('avancado')}
            size="sm"
          >
            Avançado
          </Button>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum curso encontrado.</p>
        </div>
      )}
    </div>
  )
}
