"use client"

import { CourseCard } from '@/components/dashboard/course-card'
import { useAuth } from '@/contexts/auth-context'
import { useCourses } from '@/hooks/use-courses'
import { getThumbnailUrl } from '@/lib/strapi'
import { BookOpen, Clock, Award, TrendingUp, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const { courses, isLoading } = useCourses()

  const totalLessons = courses.reduce(
    (acc, course) =>
      acc + (course.modules?.reduce((a, m) => a + (m.lessons?.length ?? 0), 0) ?? 0),
    0
  )

  const stats = [
    { icon: BookOpen,   label: 'Cursos disponíveis', value: String(courses.length) },
    { icon: Clock,      label: 'Horas de conteúdo',  value: `${courses.length * 8}h` },
    { icon: TrendingUp, label: 'Total de aulas',      value: String(totalLessons) },
    { icon: Award,      label: 'Certificados',        value: '0' },
  ]

  const firstName = user?.name?.split(' ')[0] ?? 'bem-vinda'

  return (
    <div className="px-5 sm:px-7 py-8 pb-16 max-w-7xl" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Welcome */}
      <div className="mb-7">
        <p className="flex items-center gap-2 text-accent text-[0.6rem] font-bold tracking-[0.25em] uppercase mb-2">
          <span className="w-4 h-px bg-accent" />
          Painel
        </p>
        <h1 className="font-serif text-primary font-semibold leading-tight text-2xl sm:text-3xl">
          Olá, {firstName}.<br />
          <em className="font-normal not-italic text-accent">Continue evoluindo.</em>
        </h1>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 mb-8"
        style={{ gap: '2px', background: 'rgba(196,137,106,0.1)' }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg px-4 py-4 sm:px-5 sm:py-5 hover:bg-surface transition-colors duration-200"
          >
            <div className="w-8 h-8 border border-accent/30 flex items-center justify-center text-accent mb-3">
              <stat.icon size={14} strokeWidth={1.5} />
            </div>
            <p className="font-serif text-primary text-2xl font-semibold leading-none mb-1">
              {stat.value}
            </p>
            <p className="text-secondary/50 text-[0.6rem] font-semibold tracking-[0.08em] uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Courses */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-secondary/50">
          <Loader2 size={18} className="animate-spin text-accent" />
          <span className="text-[0.82rem] tracking-wide">Carregando cursos...</span>
        </div>
      ) : courses.length > 0 ? (
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-accent/50 text-[0.58rem] font-bold tracking-[0.2em] uppercase mb-1">
                Catálogo
              </p>
              <h2 className="font-serif text-primary text-lg sm:text-xl font-semibold">
                Todos os cursos
              </h2>
            </div>
            <Link
              href="/dashboard/cursos"
              className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-accent border-b border-accent/30 pb-0.5 hover:border-accent transition-colors duration-200"
            >
              Ver todos
              <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => {
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
        </section>
      ) : (
        <div className="py-16 text-center border border-accent/10 bg-surface">
          <p className="font-serif text-secondary italic text-base">
            Nenhum curso disponível no momento.
          </p>
        </div>
      )}
    </div>
  )
}
