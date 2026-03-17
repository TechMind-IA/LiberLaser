"use client"

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { VideoPlayer } from '@/components/dashboard/video-player'
import { LessonList } from '@/components/dashboard/lesson-list'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Download, ChevronLeft, ChevronRight, FileText, Loader2 } from 'lucide-react'
import { useCourse } from '@/hooks/use-courses'
import { getThumbnailUrl, getFileUrl } from '@/lib/strapi'
import type { Lesson } from '@/lib/strapi'

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string

  const { course, isLoading, isError } = useCourse(slug)

  const allLessons = useMemo<Lesson[]>(
    () => course?.modules?.flatMap(m => m.lessons ?? []) ?? [],
    [course]
  )

  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  const effectiveLessonId = currentLessonId ?? allLessons[0]?.id ?? null
  const currentLesson = allLessons.find(l => l.id === effectiveLessonId) ?? null
  const currentLessonIndex = allLessons.findIndex(l => l.id === effectiveLessonId)
  const prevLesson = allLessons[currentLessonIndex - 1] ?? null
  const nextLesson = allLessons[currentLessonIndex + 1] ?? null

  const handleMarkComplete = () => {
    if (effectiveLessonId && !completedLessons.includes(effectiveLessonId)) {
      setCompletedLessons(prev => [...prev, effectiveLessonId])
    }
    if (nextLesson) setCurrentLessonId(nextLesson.id)
  }

  const progressPercent = allLessons.length > 0
    ? Math.round((completedLessons.length / allLessons.length) * 100)
    : 0

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // ─── Error / Not Found ───────────────────────────────────────────────────────
  if (isError || !course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Curso não encontrado.</p>
        <Link href="/dashboard/cursos">
          <Button variant="outline" className="mt-4">Voltar aos cursos</Button>
        </Link>
      </div>
    )
  }

  // ─── No lessons ─────────────────────────────────────────────────────────────
  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Este curso ainda não tem aulas cadastradas.</p>
        <Link href="/dashboard/cursos">
          <Button variant="outline" className="mt-4">Voltar aos cursos</Button>
        </Link>
      </div>
    )
  }

  // ─── Modules with progress ───────────────────────────────────────────────────
  const modulesWithProgress = course.modules?.map(module => ({
    ...module,
    lessons: (module.lessons ?? []).map(lesson => ({
      ...lesson,
      completed: completedLessons.includes(lesson.id),
    })),
  })) ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/cursos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-foreground">
            {course.title}
          </h1>
          <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
        </div>
      </div>

      {/* Progress bar */}
      {allLessons.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso do curso</span>
            <span className="font-medium text-foreground">{progressPercent}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedLessons.length} de {allLessons.length} aulas concluídas
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video + Lesson Info */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />

          {/* Lesson Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  {currentLesson.title}
                </h2>
                {currentLesson.description && (
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {currentLesson.description}
                  </p>
                )}
              </div>
              <Button
                onClick={handleMarkComplete}
                className={
                  completedLessons.includes(effectiveLessonId!)
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {completedLessons.includes(effectiveLessonId!) ? 'Concluída' : 'Marcar como concluída'}
              </Button>
            </div>

            {/* Materials */}
            {currentLesson.materials && currentLesson.materials.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-card-foreground mb-3">
                  Materiais complementares
                </h3>
                <div className="space-y-2">
                  {currentLesson.materials.map((material) => (
                    <a
                      key={material.id}
                      href={getFileUrl(material)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-card-foreground">{material.name}</span>
                      <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
              disabled={!prevLesson}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Aula anterior
            </Button>
            <Button
              onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
              disabled={!nextLesson}
            >
              Próxima aula
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Lesson List */}
        <div className="lg:col-span-1">
          <LessonList
            modules={modulesWithProgress}
            currentLessonId={String(effectiveLessonId)}
            onLessonSelect={(id) => setCurrentLessonId(Number(id))}
          />
        </div>
      </div>
    </div>
  )
}
