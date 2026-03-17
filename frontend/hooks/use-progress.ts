"use client"

import { useState, useEffect } from 'react'

interface LessonProgress {
  lessonId: string
  completed: boolean
  watchedAt?: string
}

interface CourseProgress {
  courseId: string
  lessons: LessonProgress[]
  lastAccessedAt: string
}

const PROGRESS_KEY = 'beleza_course_progress'

export function useProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress | null>(null)

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (stored) {
      const allProgress: Record<string, CourseProgress> = JSON.parse(stored)
      setProgress(allProgress[courseId] || null)
    }
  }, [courseId])

  const markLessonComplete = (lessonId: string) => {
    const stored = localStorage.getItem(PROGRESS_KEY)
    const allProgress: Record<string, CourseProgress> = stored ? JSON.parse(stored) : {}
    
    const currentProgress = allProgress[courseId] || {
      courseId,
      lessons: [],
      lastAccessedAt: new Date().toISOString()
    }

    const existingLessonIndex = currentProgress.lessons.findIndex(l => l.lessonId === lessonId)
    
    if (existingLessonIndex >= 0) {
      currentProgress.lessons[existingLessonIndex].completed = true
      currentProgress.lessons[existingLessonIndex].watchedAt = new Date().toISOString()
    } else {
      currentProgress.lessons.push({
        lessonId,
        completed: true,
        watchedAt: new Date().toISOString()
      })
    }

    currentProgress.lastAccessedAt = new Date().toISOString()
    allProgress[courseId] = currentProgress

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress))
    setProgress(currentProgress)
  }

  const isLessonComplete = (lessonId: string): boolean => {
    return progress?.lessons.some(l => l.lessonId === lessonId && l.completed) || false
  }

  const getCompletedLessons = (): string[] => {
    return progress?.lessons.filter(l => l.completed).map(l => l.lessonId) || []
  }

  const getCourseProgress = (totalLessons: number): number => {
    if (!progress || totalLessons === 0) return 0
    const completed = progress.lessons.filter(l => l.completed).length
    return Math.round((completed / totalLessons) * 100)
  }

  return {
    progress,
    markLessonComplete,
    isLessonComplete,
    getCompletedLessons,
    getCourseProgress
  }
}

// Hook to get progress for all courses
export function useAllProgress() {
  const [allProgress, setAllProgress] = useState<Record<string, CourseProgress>>({})

  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (stored) {
      setAllProgress(JSON.parse(stored))
    }
  }, [])

  const getCourseProgressPercentage = (courseId: string, totalLessons: number): number => {
    const courseProgress = allProgress[courseId]
    if (!courseProgress || totalLessons === 0) return 0
    const completed = courseProgress.lessons.filter(l => l.completed).length
    return Math.round((completed / totalLessons) * 100)
  }

  return {
    allProgress,
    getCourseProgressPercentage
  }
}
