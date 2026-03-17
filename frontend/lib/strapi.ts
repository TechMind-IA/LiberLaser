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

export async function strapiRegister(username: string, email: string, password: string) {
  const response = await fetchStrapi<{ jwt: string; user: unknown }>('/auth/local/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
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
    modules: [
      {
        id: 1,
        title: 'Introdução à Limpeza de Pele',
        description: 'Fundamentos e conceitos básicos',
        order: 1,
        lessons: [
          {
            id: 1,
            title: 'Bem-vindo ao curso',
            description: 'Nesta aula inicial, você conhecerá a estrutura do curso e os objetivos de aprendizado.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '10:00',
            order: 1,
            materials: [],
          },
          {
            id: 2,
            title: 'Anatomia da Pele',
            description: 'Entenda a estrutura da pele humana, suas camadas e funções.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '25:00',
            order: 2,
            materials: [],
          },
          {
            id: 3,
            title: 'Tipos de Pele',
            description: 'Aprenda a identificar os diferentes tipos de pele e suas características.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '20:00',
            order: 3,
            materials: [],
          },
        ],
      },
      {
        id: 2,
        title: 'Técnicas de Limpeza',
        description: 'Protocolos e procedimentos práticos',
        order: 2,
        lessons: [
          {
            id: 4,
            title: 'Preparação do Ambiente',
            description: 'Como preparar seu espaço de trabalho de forma profissional.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '15:00',
            order: 1,
            materials: [],
          },
          {
            id: 5,
            title: 'Protocolo de Limpeza Profunda',
            description: 'Passo a passo do protocolo completo de limpeza profunda.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '40:00',
            order: 2,
            materials: [],
          },
        ],
      },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    publishedAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Massagem Facial Modeladora',
    slug: 'massagem-facial-modeladora',
    description: 'Domine as técnicas de massagem facial que rejuvenescem e modelam o rosto, combinando métodos orientais e ocidentais.',
    thumbnail: {
      id: 2,
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
      name: 'thumbnail',
      width: 800,
      height: 600,
    },
    duration: '6 horas',
    level: 'intermediario',
    instructor: 'Carla Mendes',
    modules: [
      {
        id: 3,
        title: 'Fundamentos da Massagem Facial',
        description: 'Base teórica e técnicas introdutórias',
        order: 1,
        lessons: [
          {
            id: 6,
            title: 'Introdução às técnicas orientais',
            description: 'Conheça as bases da massagem shiatsu e kobido aplicadas ao rosto.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '30:00',
            order: 1,
            materials: [],
          },
        ],
      },
    ],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    publishedAt: '2024-02-01',
  },
  {
    id: 3,
    title: 'Micropigmentação Avançada',
    slug: 'micropigmentacao-avancada',
    description: 'Técnicas avançadas de micropigmentação para sobrancelhas, lábios e hairline com os melhores pigmentos do mercado.',
    thumbnail: {
      id: 3,
      url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=600&fit=crop',
      name: 'thumbnail',
      width: 800,
      height: 600,
    },
    duration: '12 horas',
    level: 'avancado',
    instructor: 'Juliana Costa',
    modules: [
      {
        id: 4,
        title: 'Biossegurança e Regulamentação',
        description: 'Normas obrigatórias para a prática segura',
        order: 1,
        lessons: [
          {
            id: 7,
            title: 'Normas de Biossegurança',
            description: 'Protocolos de esterilização, EPI e descarte de materiais.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '45:00',
            order: 1,
            materials: [],
          },
        ],
      },
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    publishedAt: '2024-03-01',
  },
]
