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

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Strapi error: ${response.statusText}`)
  }

  return response.json()
}

// Course types
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

// API functions
export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      '/courses?populate[thumbnail]=*&populate[modules][populate][lessons]=*'
    )
    return response.data
  } catch {
    // Return mock data for development
    return mockCourses
  }
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Course[]>>(
      `/courses?filters[slug][$eq]=${slug}&populate[thumbnail]=*&populate[modules][populate][lessons][populate][materials]=*`
    )
    return response.data[0] || null
  } catch {
    // Return mock data for development
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
    // Return mock lesson
    const course = mockCourses.find(c => c.attributes.slug === courseSlug)
    if (!course) return null
    
    for (const module of course.attributes.modules.data) {
      const lesson = module.attributes.lessons.data.find(l => l.id === lessonId)
      if (lesson) return lesson
    }
    return null
  }
}

// Auth functions
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

// Mock data for development
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
            url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop'
          }
        }
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
                      description: 'Introdução ao curso de limpeza de pele',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '10:00',
                      order: 1,
                      materials: { data: [] }
                    }
                  },
                  {
                    id: 'l2',
                    attributes: {
                      title: 'Anatomia da Pele',
                      description: 'Entendendo a estrutura da pele',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '25:00',
                      order: 2,
                      materials: { data: [] }
                    }
                  },
                  {
                    id: 'l3',
                    attributes: {
                      title: 'Tipos de Pele',
                      description: 'Identificando os diferentes tipos de pele',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '20:00',
                      order: 3,
                      materials: { data: [] }
                    }
                  }
                ]
              }
            }
          },
          {
            id: 'm2',
            attributes: {
              title: 'Técnicas de Limpeza',
              description: 'Procedimentos práticos',
              order: 2,
              lessons: {
                data: [
                  {
                    id: 'l4',
                    attributes: {
                      title: 'Preparação do Ambiente',
                      description: 'Como preparar seu espaço de trabalho',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '15:00',
                      order: 1,
                      materials: { data: [] }
                    }
                  },
                  {
                    id: 'l5',
                    attributes: {
                      title: 'Higienização',
                      description: 'Passo a passo da higienização',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '30:00',
                      order: 2,
                      materials: { data: [] }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  },
  {
    id: '2',
    attributes: {
      title: 'Design de Sobrancelhas',
      slug: 'design-de-sobrancelhas',
      description: 'Domine a arte do design de sobrancelhas com técnicas avançadas de visagismo e aplicação.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop'
          }
        }
      },
      duration: '6 horas',
      level: 'intermediario',
      instructor: 'Maria Oliveira',
      modules: {
        data: [
          {
            id: 'm3',
            attributes: {
              title: 'Visagismo Facial',
              description: 'Estudo do formato do rosto',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l6',
                    attributes: {
                      title: 'Introdução ao Visagismo',
                      description: 'Conceitos fundamentais',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '20:00',
                      order: 1,
                      materials: { data: [] }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01'
    }
  },
  {
    id: '3',
    attributes: {
      title: 'Massagem Facial Rejuvenescedora',
      slug: 'massagem-facial-rejuvenescedora',
      description: 'Técnicas de massagem facial para rejuvenescimento e relaxamento, incluindo drenagem linfática.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop'
          }
        }
      },
      duration: '10 horas',
      level: 'avancado',
      instructor: 'Dr. Carlos Santos',
      modules: {
        data: [
          {
            id: 'm4',
            attributes: {
              title: 'Anatomia Facial',
              description: 'Músculos e estruturas faciais',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l7',
                    attributes: {
                      title: 'Músculos da Face',
                      description: 'Estudo detalhado da musculatura',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '35:00',
                      order: 1,
                      materials: { data: [] }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      createdAt: '2024-02-15',
      updatedAt: '2024-02-15'
    }
  },
  {
    id: '4',
    attributes: {
      title: 'Micropigmentação Labial',
      slug: 'micropigmentacao-labial',
      description: 'Curso completo de micropigmentação labial com técnicas modernas e seguras.',
      thumbnail: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=600&fit=crop'
          }
        }
      },
      duration: '12 horas',
      level: 'avancado',
      instructor: 'Juliana Costa',
      modules: {
        data: [
          {
            id: 'm5',
            attributes: {
              title: 'Introdução à Micropigmentação',
              description: 'Fundamentos e biossegurança',
              order: 1,
              lessons: {
                data: [
                  {
                    id: 'l8',
                    attributes: {
                      title: 'Biossegurança',
                      description: 'Normas e procedimentos de segurança',
                      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                      duration: '45:00',
                      order: 1,
                      materials: { data: [] }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01'
    }
  }
]
