const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

// ─── Response Types (Strapi v5 — flat format, sem "attributes") ──────────────

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiImage {
  id: number
  url: string
  name: string
  width: number
  height: number
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export interface Material {
  id: number
  name: string
  file: StrapiImage
}

export interface Lesson {
  id: number
  title: string
  description: string
  videoUrl: string
  duration: string
  order: number
  materials: Material[]
}

export interface Module {
  id: number
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

export interface Course {
  id: number
  title: string
  slug: string
  description: string
  thumbnail: StrapiImage
  duration: string
  level: 'iniciante' | 'intermediario' | 'avancado'
  instructor: string
  modules: Module[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getUserJwt(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('beleza_jwt')
}

export function getThumbnailUrl(course: Course): string {
  const url = course.thumbnail?.url
  if (!url) return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop'
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

export function getFileUrl(material: Material): string {
  const url = material.file?.url
  if (!url) return '#'
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

// ─── Fetch base ───────────────────────────────────────────────────────────────

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`
  const token = getUserJwt() || STRAPI_TOKEN

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData?.error?.message || `Strapi error: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      '/courses' +
      '?populate[thumbnail][fields][0]=url' +
      '&populate[thumbnail][fields][1]=formats' +
      '&populate[modules][populate][lessons][fields][0]=id' +
      '&populate[modules][populate][lessons][fields][1]=title' +
      '&populate[modules][populate][lessons][fields][2]=duration' +
      '&populate[modules][populate][lessons][fields][3]=order' +
      '&sort=createdAt:desc'
    )
    return response.data
  } catch (err) {
    console.warn('[Strapi] getCourses falhou, usando mock:', err)
    return mockCourses
  }
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      `/courses` +
      `?filters[slug][$eq]=${slug}` +
      `&populate[thumbnail][fields][0]=url` +
      `&populate[thumbnail][fields][1]=formats` +
      `&populate[modules][populate][lessons][populate][materials][populate][file][fields][0]=url` +
      `&populate[modules][populate][lessons][populate][materials][populate][file][fields][1]=name`
    )
    return response.data[0] ?? null
  } catch (err) {
    console.warn('[Strapi] getCourse falhou, usando mock:', err)
    return mockCourses.find(c => c.slug === slug) ?? null
  }
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Lesson>>(
      `/lessons/${lessonId}` +
      `?populate[materials][populate][file][fields][0]=url` +
      `&populate[materials][populate][file][fields][1]=name`
    )
    return response.data
  } catch (err) {
    console.warn('[Strapi] getLesson falhou, usando mock:', err)
    for (const course of mockCourses) {
      for (const mod of course.modules) {
        const lesson = mod.lessons.find(l => String(l.id) === lessonId)
        if (lesson) return lesson
      }
    }
    return null
  }
}

// ─── Auth Functions ───────────────────────────────────────────────────────────

export async function strapiLogin(email: string, password: string) {
  const response = await fetchStrapi<{ jwt: string; user: unknown }>('/auth/local', {
    method: 'POST',
    body: JSON.stringify({ identifier: email, password }),
  })
  return response
}

export async function strapiGetMe(jwt: string) {
  const response = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  if (!response.ok) throw new Error('Token inválido ou expirado')
  return response.json()
}

// ─── Mock Data (Strapi v5 flat format) ────────────────────────────────────────

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Limpeza de Pele Profissional',
    slug: 'limpeza-de-pele-profissional',
    description: 'Aprenda todas as técnicas de limpeza de pele profissional, desde a preparação até os cuidados pós-procedimento.',
    thumbnail: {
      id: 1,
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
      name: 'thumbnail',
      width: 800,
      height: 600,
    },
    duration: '8 horas',
    level: 'iniciante',
    instructor: 'Dra. Ana Silva',
    modules: [],
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
  },
]
