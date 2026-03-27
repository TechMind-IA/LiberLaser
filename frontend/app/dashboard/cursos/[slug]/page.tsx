"use client"

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { VideoPlayer } from '@/components/dashboard/video-player'
import { LessonList } from '@/components/dashboard/lesson-list'
import {
  ArrowLeft, CheckCircle, Download, ChevronLeft, ChevronRight,
  FileText, Loader2, BookOpen, Clock, Award, LayoutList
} from 'lucide-react'
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

  // ─── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-3"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <Loader2 size={22} className="animate-spin text-accent" />
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-secondary/35">
          Carregando curso...
        </p>
      </div>
    )
  }

  // ─── Error / Not Found ────────────────────────────────────────────────────────
  if (isError || !course) {
    return (
      <div
        className="px-5 sm:px-7 py-12 text-center"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <p className="font-serif text-secondary italic text-base mb-4">
          Curso não encontrado.
        </p>
        <Link
          href="/dashboard/cursos"
          className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-accent border-b border-accent/30 hover:border-accent transition-colors"
        >
          <ArrowLeft size={11} />
          Voltar aos cursos
        </Link>
      </div>
    )
  }

  // ─── No lessons ───────────────────────────────────────────────────────────────
  if (!currentLesson) {
    return (
      <div
        className="px-5 sm:px-7 py-12 text-center"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <p className="font-serif text-secondary italic text-base mb-4">
          Este curso ainda não tem aulas cadastradas.
        </p>
        <Link
          href="/dashboard/cursos"
          className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-accent border-b border-accent/30 hover:border-accent transition-colors"
        >
          <ArrowLeft size={11} />
          Voltar aos cursos
        </Link>
      </div>
    )
  }

  // ─── Modules with progress ────────────────────────────────────────────────────
  const modulesWithProgress = course.modules?.map(module => ({
    ...module,
    lessons: (module.lessons ?? []).map(lesson => ({
      ...lesson,
      completed: completedLessons.includes(lesson.id),
    })),
  })) ?? []

  const isCurrentCompleted = completedLessons.includes(effectiveLessonId!)

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Top bar ── */}
      <div className="px-5 sm:px-7 py-4 border-b border-accent/10 bg-bg flex items-center justify-between gap-4 sticky top-[60px] z-20">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard/cursos"
            className="w-8 h-8 border border-accent/18 flex items-center justify-center text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200 shrink-0"
          >
            <ArrowLeft size={14} />
          </Link>
          <div className="min-w-0">
            <p className="text-accent text-[0.58rem] font-bold tracking-[0.2em] uppercase">
              {course.instructor}
            </p>
            <h1 className="font-serif text-primary font-semibold text-base sm:text-lg leading-tight truncate">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress pill */}
        {allLessons.length > 0 && (
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-surface overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[0.62rem] font-bold text-accent min-w-[2.2rem]">
                {progressPercent}%
              </span>
            </div>
            <span className="text-[0.6rem] text-secondary/40 font-medium">
              {completedLessons.length}/{allLessons.length} aulas
            </span>
          </div>
        )}
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-1 min-h-0">
        {/* Left: video + info */}
        <div className="flex-1 min-w-0 px-5 sm:px-7 py-6 flex flex-col gap-6">
          {/* Video */}
          <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />

          {/* Navigation */}
          <div className="flex items-center justify-between pb-6">
            <button
              onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
              disabled={!prevLesson}
              className="flex items-center gap-2 px-4 py-2.5 border border-accent/15 text-[0.68rem] font-bold tracking-[0.1em] uppercase text-secondary/60 hover:border-accent/40 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <ChevronLeft size={13} />
              Aula anterior
            </button>

            {/* Right group: mark complete + next */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkComplete}
                disabled={isCurrentCompleted}
                className={[
                  'shrink-0 flex items-center gap-2 px-6 py-2.5 text-[0.68rem] font-bold tracking-[0.1em] uppercase transition-all duration-200',
                  isCurrentCompleted
                    ? 'bg-surface border border-accent/15 text-accent/60 cursor-default'
                    : 'bg-primary text-bg hover:bg-secondary border border-primary hover:border-secondary',
                ].join(' ')}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <CheckCircle size={13} strokeWidth={isCurrentCompleted ? 2 : 1.5} />
                {isCurrentCompleted ? 'Concluída' : 'Marcar concluída'}
              </button>

              <button
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
                disabled={!nextLesson}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-bg text-[0.68rem] font-bold tracking-[0.1em] uppercase hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Próxima aula
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: lesson list */}
        <aside className="hidden lg:flex w-[320px] xl:w-[360px] shrink-0 border-l border-accent/10 flex-col">
          {/* Sidebar header */}
          <div className="px-5 py-4 border-b border-accent/10 bg-surface/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent/55 mb-0.5">
                  Conteúdo
                </p>
                <h3 className="font-serif text-primary font-semibold text-[0.95rem]">
                  Módulos do curso
                </h3>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-[0.7rem] font-bold text-accent">{progressPercent}%</p>
                  <p className="text-[0.58rem] text-secondary/40">concluído</p>
                </div>
                <div className="w-8 h-8 border border-accent/18 flex items-center justify-center">
                  <Award size={13} className="text-accent/50" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* mini progress */}
            <div className="mt-3 h-1 bg-border/60 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Lesson list */}
          <div className="flex-1 overflow-y-auto">
            <LessonList
              modules={modulesWithProgress}
              currentLessonId={String(effectiveLessonId)}
              onLessonSelect={(id) => setCurrentLessonId(Number(id))}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
