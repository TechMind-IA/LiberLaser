import Link from 'next/link'
import { Clock, BookOpen } from 'lucide-react'

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

const levelLabel: Record<string, string> = {
  iniciante:     'Iniciante',
  intermediario: 'Intermediário',
  avancado:      'Avançado',
}

export function CourseCard({
  id, title, description, thumbnail,
  duration, level, instructor, lessonsCount, progress = 0,
}: CourseCardProps) {
  const label = levelLabel[level] ?? level

  return (
    <Link href={`/dashboard/cursos/${id}`} className="block group" style={{ textDecoration: 'none' }}>
      <article
        className="bg-bg border border-accent/15 overflow-hidden transition-all duration-250 hover:shadow-lg hover:border-accent/35"
        style={{ transform: 'translateY(0)', transition: 'all 0.25s ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-surface">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <span className="absolute top-2.5 left-2.5 bg-accent text-bg text-[0.52rem] font-bold tracking-[0.18em] uppercase px-2 py-0.5">
            {label}
          </span>
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary/30">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            className="font-serif text-primary font-semibold leading-snug mb-1.5"
            style={{ fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {title}
          </h3>
          <p
            className="text-secondary text-[0.75rem] leading-relaxed mb-3"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 pt-3 border-t border-accent/10">
            <span className="flex items-center gap-1 text-[0.65rem] text-secondary/55">
              <Clock size={10} strokeWidth={1.5} />
              {duration}
            </span>
            <span className="flex items-center gap-1 text-[0.65rem] text-secondary/55">
              <BookOpen size={10} strokeWidth={1.5} />
              {lessonsCount} aulas
            </span>
            {progress > 0 && (
              <span className="ml-auto text-[0.62rem] font-bold text-accent">{progress}%</span>
            )}
          </div>

          <p className="mt-2 text-[0.65rem] text-secondary/45">
            Por <span className="font-semibold text-secondary/60">{instructor}</span>
          </p>
        </div>
      </article>
    </Link>
  )
}
