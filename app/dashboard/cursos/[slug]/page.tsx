"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { VideoPlayer } from '@/components/dashboard/video-player'
import { LessonList } from '@/components/dashboard/lesson-list'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  CheckCircle, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  FileText
} from 'lucide-react'

// Mock data - will be replaced with Strapi data
const coursesData: Record<string, {
  title: string
  description: string
  instructor: string
  modules: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      description: string
      videoUrl: string
      duration: string
      completed: boolean
      materials: { name: string; url: string }[]
    }[]
  }[]
}> = {
  'limpeza-de-pele-profissional': {
    title: 'Limpeza de Pele Profissional',
    description: 'Aprenda todas as técnicas de limpeza de pele profissional.',
    instructor: 'Dra. Ana Silva',
    modules: [
      {
        id: 'm1',
        title: 'Introdução à Limpeza de Pele',
        lessons: [
          {
            id: 'l1',
            title: 'Bem-vindo ao curso',
            description: 'Nesta aula inicial, você conhecerá a estrutura do curso, os objetivos de aprendizado e o que você será capaz de realizar ao final do treinamento.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '10:00',
            completed: true,
            materials: [
              { name: 'Apostila do Curso.pdf', url: '#' },
              { name: 'Lista de Materiais.pdf', url: '#' }
            ]
          },
          {
            id: 'l2',
            title: 'Anatomia da Pele',
            description: 'Entenda a estrutura da pele humana, suas camadas e funções. Este conhecimento é fundamental para realizar procedimentos seguros e eficazes.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '25:00',
            completed: true,
            materials: [
              { name: 'Infográfico - Camadas da Pele.pdf', url: '#' }
            ]
          },
          {
            id: 'l3',
            title: 'Tipos de Pele',
            description: 'Aprenda a identificar os diferentes tipos de pele e suas características específicas para personalizar cada tratamento.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '20:00',
            completed: false,
            materials: []
          }
        ]
      },
      {
        id: 'm2',
        title: 'Técnicas de Limpeza',
        lessons: [
          {
            id: 'l4',
            title: 'Preparação do Ambiente',
            description: 'Como preparar seu espaço de trabalho de forma profissional, garantindo higiene e conforto para o cliente.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '15:00',
            completed: false,
            materials: [
              { name: 'Checklist de Preparação.pdf', url: '#' }
            ]
          },
          {
            id: 'l5',
            title: 'Higienização Inicial',
            description: 'Passo a passo completo da higienização inicial da pele do cliente.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '30:00',
            completed: false,
            materials: []
          },
          {
            id: 'l6',
            title: 'Extração de Comedões',
            description: 'Técnicas seguras e eficazes para extração de comedões sem causar danos à pele.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '35:00',
            completed: false,
            materials: [
              { name: 'Protocolo de Extração.pdf', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'm3',
        title: 'Finalização e Cuidados',
        lessons: [
          {
            id: 'l7',
            title: 'Máscaras Faciais',
            description: 'Diferentes tipos de máscaras faciais e suas indicações para cada tipo de pele.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '25:00',
            completed: false,
            materials: []
          },
          {
            id: 'l8',
            title: 'Cuidados Pós-Procedimento',
            description: 'Orientações essenciais para o cliente após a limpeza de pele.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '15:00',
            completed: false,
            materials: [
              { name: 'Ficha de Orientações ao Cliente.pdf', url: '#' }
            ]
          }
        ]
      }
    ]
  }
}

// Default course data for other slugs
const defaultCourseData = coursesData['limpeza-de-pele-profissional']

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  
  const course = coursesData[slug] || { ...defaultCourseData, title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }
  
  const allLessons = course.modules.flatMap(m => m.lessons)
  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0]?.id || '')
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    allLessons.filter(l => l.completed).map(l => l.id)
  )
  
  const currentLesson = allLessons.find(l => l.id === currentLessonId)
  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId)
  const prevLesson = allLessons[currentLessonIndex - 1]
  const nextLesson = allLessons[currentLessonIndex + 1]

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLessonId)) {
      setCompletedLessons(prev => [...prev, currentLessonId])
    }
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id)
    }
  }

  // Update modules with completion status
  const modulesWithProgress = course.modules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      completed: completedLessons.includes(lesson.id)
    }))
  }))

  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Curso não encontrado</p>
        <Link href="/dashboard">
          <Button variant="outline" className="mt-4">
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl lg:text-2xl font-serif font-bold text-foreground">
            {course.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Por {course.instructor}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video and Lesson Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <VideoPlayer 
            videoUrl={currentLesson.videoUrl} 
            title={currentLesson.title} 
          />

          {/* Lesson Info */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  {currentLesson.title}
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {currentLesson.description}
                </p>
              </div>
              <Button
                onClick={handleMarkComplete}
                className={completedLessons.includes(currentLessonId) 
                  ? "bg-primary/20 text-primary hover:bg-primary/30" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {completedLessons.includes(currentLessonId) ? 'Concluída' : 'Marcar como concluída'}
              </Button>
            </div>

            {/* Materials */}
            {currentLesson.materials.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-card-foreground mb-4">
                  Materiais Complementares
                </h3>
                <div className="space-y-2">
                  {currentLesson.materials.map((material, index) => (
                    <a
                      key={index}
                      href={material.url}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="flex-1 text-sm text-card-foreground">
                        {material.name}
                      </span>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => prevLesson && setCurrentLessonId(prevLesson.id)}
                disabled={!prevLesson}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                onClick={() => nextLesson && setCurrentLessonId(nextLesson.id)}
                disabled={!nextLesson}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Próxima
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson List Sidebar */}
        <div className="lg:col-span-1">
          <LessonList
            modules={modulesWithProgress}
            currentLessonId={currentLessonId}
            onSelectLesson={setCurrentLessonId}
          />
        </div>
      </div>
    </div>
  )
}
