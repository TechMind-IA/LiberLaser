"use client"

import { CourseCard } from '@/components/dashboard/course-card'
import { useAuth } from '@/contexts/auth-context'
import { useCourses } from '@/hooks/use-courses'
import { getThumbnailUrl } from '@/lib/strapi'
import { BookOpen, Clock, Award, TrendingUp, Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const { courses, isLoading } = useCourses()

  const totalLessons = courses.reduce(
    (acc, course) =>
      acc + (course.modules?.reduce((a, m) => a + (m.lessons?.length ?? 0), 0) ?? 0),
    0
  )

  const stats = [
    { icon: BookOpen, label: 'Cursos disponíveis', value: courses.length },
    { icon: Clock, label: 'Horas de conteúdo', value: `${courses.length * 8}h` },
    { icon: Award, label: 'Certificados', value: 0 },
    { icon: TrendingUp, label: 'Aulas', value: totalLessons },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">
          Olá, {user?.name?.split(' ')[0] || 'bem-vindo'}! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Continue de onde você parou e avance em seus estudos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 lg:p-6 bg-card rounded-xl border border-border">
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

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* All Courses */}
      {!isLoading && courses.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Todos os Cursos</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => {
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
        </section>
      )}

      {!isLoading && courses.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          Nenhum curso disponível no momento.
        </div>
      )}
    </div>
  )
}