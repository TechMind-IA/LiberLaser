import Link from 'next/link'
import { Clock, BookOpen, BarChart } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface CourseCardProps {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  level: string
  instructor: string
  lessonsCount: number
  progress?: number
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  duration,
  level,
  instructor,
  lessonsCount,
  progress = 0
}: CourseCardProps) {
  const levelLabel = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  }[level] || level

  return (
    <Link href={`/dashboard/cursos/${id}`}>
      <article className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {levelLabel}
            </span>
          </div>
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3">
              <div className="flex items-center justify-between text-xs text-background mb-1">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{lessonsCount} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-3.5 w-3.5" />
              <span>{levelLabel}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Por <span className="text-card-foreground font-medium">{instructor}</span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
