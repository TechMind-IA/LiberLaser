const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
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

function getUserJwt(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('beleza_jwt')
}

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`

  // Prioridade: JWT do usuário logado > API token de servidor
  const token = getUserJwt() || STRAPI_TOKEN

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData?.error?.message || `Strapi error: ${response.statusText}`
    )
  }

  return response.json()
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Course {
  id: string
  attributes: {
    title: string
    slug: string
    description: string
    thumbnail: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    duration: string
    level: 'iniciante' | 'intermediario' | 'avancado'
    instructor: string
    modules: {
      data: Module[]
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Module {
  id: string
  attributes: {
    title: string
    description: string
    order: number
    lessons: {
      data: Lesson[]
    }
  }
}

export interface Lesson {
  id: string
  attributes: {
    title: string
    description: string
    videoUrl: string
    duration: string
    order: number
    materials: {
      data: Material[]
    }
  }
}

export interface Material {
  id: string
  attributes: {
    name: string
    file: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getThumbnailUrl(course: Course): string {
  const url = course.attributes.thumbnail?.data?.attributes?.url
  if (!url) return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop'
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

export function getFileUrl(material: Material): string {
  const url = material.attributes.file?.data?.attributes?.url
  if (!url) return '#'
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      '/courses?populate[thumbnail]=*&populate[modules][populate][lessons]=*&sort=createdAt:desc'
    )
    return response.data
  } catch {
    return mockCourses
  }
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      `/courses?filters[slug][$eq]=${slug}&populate[thumbnail]=*&populate[modules][populate][lessons][populate][materials][populate][file]=*`
    )
    return response.data[0] || null
  } catch {
    return mockCourses.find(c => c.attributes.slug === slug) || null
  }
}

export async function getLesson(courseSlug: string, lessonId: string): Promise<Lesson | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Lesson>>(
      `/lessons/${lessonId}?populate[materials][populate][file]=*`
    )
    return response.data
  } catch {
    const course = mockCourses.find(c => c.attributes.slug === courseSlug)
    if (!course) return null
    for (const mod of course.attributes.modules.data) {
      const lesson = mod.attributes.lessons.data.find(l => l.id === lessonId)
      if (lesson) return lesson
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockCourses: Course[] = [
  {
    id: '1',
    attributes: {
      title: 'Limpeza de Pele Profissional',
      slug: 'limpeza-de-pele-profissional',
      description: 'Aprenda todas as técnicas de limpeza de pele profissional, desde a preparação até os cuidados pós-procedimento.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
          },
        },
      },
      duration: '8 horas',
      level: 'iniciante',
      instructor: 'Dra. Ana Silva',
      modules: {
        data: [
          {
            id: 'm1',
            attributes: {
              title: 'Introdução à Limpeza de Pele',
              description: 'Fundamentos e conceitos básicos',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l1',
                    attributes: {
                      title: 'Bem-vindo ao curso',
                      description: 'Nesta aula inicial, você conhecerá a estrutura do curso e os objetivos de aprendizado.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '10:00',
                      order: 1,
                      materials: { data: [] },
                    },
                  },
                  {
                    id: 'l2',
                    attributes: {
                      title: 'Anatomia da Pele',
                      description: 'Entenda a estrutura da pele humana, suas camadas e funções.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '25:00',
                      order: 2,
                      materials: { data: [] },
                    },
                  },
                  {
                    id: 'l3',
                    attributes: {
                      title: 'Tipos de Pele',
                      description: 'Aprenda a identificar os diferentes tipos de pele e suas características.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '20:00',
                      order: 3,
                      materials: { data: [] },
                    },
                  },
                ],
              },
            },
          },
          {
            id: 'm2',
            attributes: {
              title: 'Técnicas de Limpeza',
              description: 'Protocolos e procedimentos práticos',
              order: 2,
              lessons: {
                data: [
                  {
                    id: 'l4',
                    attributes: {
                      title: 'Preparação do Ambiente',
                      description: 'Como preparar seu espaço de trabalho de forma profissional.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '15:00',
                      order: 1,
                      materials: { data: [] },
                    },
                  },
                  {
                    id: 'l5',
                    attributes: {
                      title: 'Protocolo de Limpeza Profunda',
                      description: 'Passo a passo do protocolo completo de limpeza profunda.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '40:00',
                      order: 2,
                      materials: { data: [] },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      publishedAt: '2024-01-15',
    },
  },
  {
    id: '2',
    attributes: {
      title: 'Massagem Facial Modeladora',
      slug: 'massagem-facial-modeladora',
      description: 'Domine as técnicas de massagem facial que rejuvenescem e modelam o rosto, combinando métodos orientais e ocidentais.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
          },
        },
      },
      duration: '6 horas',
      level: 'intermediario',
      instructor: 'Carla Mendes',
      modules: {
        data: [
          {
            id: 'm3',
            attributes: {
              title: 'Fundamentos da Massagem Facial',
              description: 'Base teórica e técnicas introdutórias',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l6',
                    attributes: {
                      title: 'Introdução às técnicas orientais',
                      description: 'Conheça as bases da massagem shiatsu e kobido aplicadas ao rosto.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '30:00',
                      order: 1,
                      materials: { data: [] },
                    },
                  },
                  {
                    id: 'l7',
                    attributes: {
                      title: 'Mapeamento dos pontos faciais',
                      description: 'Identifique os principais pontos de pressão e drenagem do rosto.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '25:00',
                      order: 2,
                      materials: { data: [] },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01',
      publishedAt: '2024-02-01',
    },
  },
  {
    id: '3',
    attributes: {
      title: 'Micropigmentação Avançada',
      slug: 'micropigmentacao-avancada',
      description: 'Técnicas avançadas de micropigmentação para sobrancelhas, lábios e hairline com os melhores pigmentos do mercado.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=600&fit=crop',
          },
        },
      },
      duration: '12 horas',
      level: 'avancado',
      instructor: 'Juliana Costa',
      modules: {
        data: [
          {
            id: 'm5',
            attributes: {
              title: 'Biossegurança e Regulamentação',
              description: 'Normas obrigatórias para a prática segura',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l8',
                    attributes: {
                      title: 'Normas de Biossegurança',
                      description: 'Protocolos de esterilização, EPI e descarte de materiais.',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '45:00',
                      order: 1,
                      materials: { data: [] },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01',
      publishedAt: '2024-03-01',
    },
  },
]
