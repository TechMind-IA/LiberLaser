export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  watchedAt?: string
}

export interface CourseProgress {
  courseId: string
  lessons: LessonProgress[]
  lastAccessedAt: string
}
