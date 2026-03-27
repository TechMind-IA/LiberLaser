"use client"

import { cn } from '@/lib/utils'
import { CheckCircle, Circle, Play, Lock, ChevronDown, ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface LessonListProps {
  modules: Module[]
  currentLessonId: string
  onSelectLesson: (lessonId: string) => void
}

export function LessonList({ modules, currentLessonId, onSelectLesson }: LessonListProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    modules.map(m => m.id) // All expanded by default
  )

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter(l => l.completed).length
    return Math.round((completed / module.lessons.length) * 100)
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="divide-y divide-border max-h-[calc(100vh-300px)] overflow-y-auto">
        {modules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.includes(module.id)
          const progress = getModuleProgress(module)

          return (
            <div key={module.id}>
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    Módulo {moduleIndex + 1}
                  </p>
                  <p className="font-medium text-card-foreground text-sm truncate">
                    {module.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {progress}%
                    </span>
                  </div>
                </div>
              </button>

              {/* Lessons */}
              {isExpanded && (
                <div className="bg-secondary/30">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isActive = lesson.id === currentLessonId
                    const isCompleted = lesson.completed
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={cn(
                          "w-full p-4 pl-12 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left border-t border-border/50",
                          isActive && "bg-primary/10 border-l-2 border-l-primary"
                        )}
                      >
                        {/* Status Icon */}
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : isActive ? (
                            <Play className="h-5 w-5 text-primary fill-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            isActive ? "text-primary" : "text-card-foreground"
                          )}>
                            {lessonIndex + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
