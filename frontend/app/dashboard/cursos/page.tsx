"use client"

import { useState } from 'react'
import { CourseCard } from '@/components/dashboard/course-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2 } from 'lucide-react'
import { useCourses } from '@/hooks/use-courses'
import { getThumbnailUrl } from '@/lib/strapi'

export default function CursosPage() {
  const { courses, isLoading, isError } = useCourses()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <div className="flex gap-2 flex-wrap">
          <Button variant={selectedLevel === null ? 'default' : 'outline'} onClick={() => setSelectedLevel(null)} size="sm">Todos</Button>
          <Button variant={selectedLevel === 'iniciante' ? 'default' : 'outline'} onClick={() => setSelectedLevel('iniciante')} size="sm">Iniciante</Button>
          <Button variant={selectedLevel === 'intermediario' ? 'default' : 'outline'} onClick={() => setSelectedLevel('intermediario')} size="sm">Intermediário</Button>
          <Button variant={selectedLevel === 'avancado' ? 'default' : 'outline'} onClick={() => setSelectedLevel('avancado')} size="sm">Avançado</Button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Erro ao carregar cursos. Tente novamente.</p>
        </div>
      )}

      {/* Courses Grid */}
      {!isLoading && !isError && (
        filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const lessonsCount = course.modules?.reduce(
                (acc, mod) => acc + (mod.lessons?.length ?? 0), 0
              ) ?? 0

              return (
                <CourseCard
                  key={course.id}
                  id={course.slug}
                  title={course.title}
                  description={course.description}
                  thumbnail={getThumbnailUrl(course)}
                  duration={course.duration}
                  level={course.level}
                  instructor={course.instructor}
                  lessonsCount={lessonsCount}
                  progress={0}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum curso encontrado.</p>
          </div>
        )
      )}
    </div>
  )
}
