"use client"

import useSWR from 'swr'
import { getCourses, getCourse, type Course } from '@/lib/strapi'

export function useCourses() {
  const { data, error, isLoading, mutate } = useSWR<Course[]>(
    'courses',
    getCourses,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    courses: data || [],
    isLoading,
    isError: !!error,
    mutate,
  }
}

export function useCourse(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<Course | null>(
    slug ? `course-${slug}` : null,
    () => getCourse(slug),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    course: data ?? null,
    isLoading,
    isError: !!error,
    mutate,
  }
}