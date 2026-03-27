"use client"

import { useState, useMemo } from 'react'
import { CourseCard } from '@/components/dashboard/course-card'
import { Search, SlidersHorizontal, BookOpen, Loader2, X } from 'lucide-react'
import { useCourses } from '@/hooks/use-courses'
import { getThumbnailUrl } from '@/lib/strapi'

const LEVELS = [
  { value: null,          label: 'Todos' },
  { value: 'iniciante',   label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado',    label: 'Avançado' },
]

export default function CursosPage() {
  const { courses, isLoading, isError } = useCourses()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const filteredCourses = useMemo(() => courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = !selectedLevel || course.level === selectedLevel
    return matchesSearch && matchesLevel
  }), [courses, searchQuery, selectedLevel])

  return (
    <div
      className="px-5 sm:px-7 py-8 pb-16 max-w-7xl"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Page Header ── */}
      <div className="mb-8">
        <p className="flex items-center gap-2 text-accent font-bold tracking-[0.25em] uppercase mb-3 text-[0.65rem]">
          <span className="w-5 h-px bg-accent" />
          Plataforma
        </p>
        <h1 className="font-serif text-primary font-semibold text-3xl sm:text-4xl leading-tight mb-2">
          Meus Cursos
        </h1>
        <p className="text-secondary/70 text-[0.9rem] leading-relaxed max-w-2xl">
          Explore todo o conteúdo disponível para você na plataforma.
        </p>
      </div>

      {/* ── Search + Filters Bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/50 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título ou descrição..."
            className="w-full h-11 pl-10 pr-10 bg-white border-2 border-neutral-200 text-[0.85rem] text-primary placeholder:text-secondary/40 focus:border-accent focus:outline-none transition-colors duration-200 font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-secondary transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Level filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal size={13} className="text-secondary/50 shrink-0" />
          {LEVELS.map((lvl) => (
            <button
              key={String(lvl.value)}
              onClick={() => setSelectedLevel(lvl.value)}
              className={[
                'h-9 px-4 text-[0.7rem] font-bold tracking-wide border-2 transition-all duration-200',
                selectedLevel === lvl.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-secondary/70 border-neutral-300 hover:border-accent/60 hover:text-secondary',
              ].join(' ')}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 size={22} className="animate-spin text-accent" />
          <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-secondary/35">
            Carregando cursos...
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {isError && (
        <div className="py-16 text-center border-2 border-red-200 bg-red-50">
          <p className="font-serif text-red-700 italic text-base font-medium">
            Erro ao carregar os cursos. Tente novamente.
          </p>
        </div>
      )}

      {/* ── Courses Grid ── */}
      {!isLoading && !isError && (
        <>
          {/* Count */}
          {filteredCourses.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={14} className="text-accent" />
              <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-secondary/70">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
              </span>
            </div>
          )}

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCourses.map((course) => {
                const lessonsCount =
                  course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length ?? 0), 0) ?? 0

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
            <div className="py-20 text-center border-2 border-neutral-300 bg-neutral-50">
              <div className="w-14 h-14 border-2 border-neutral-300 flex items-center justify-center text-secondary/50 mx-auto mb-4">
                <BookOpen size={24} strokeWidth={1.5} />
              </div>
              <p className="font-serif text-secondary/70 italic text-base mb-2 font-medium">
                Nenhum curso encontrado.
              </p>
              {(searchQuery || selectedLevel) && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedLevel(null) }}
                  className="mt-4 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent border-b-2 border-accent hover:text-accent/80 hover:border-accent/80 transition-colors"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
