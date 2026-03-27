import Link from 'next/link'
import { Clock, BookOpen, Play } from 'lucide-react'

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

const levelConfig: Record<string, { label: string; color: string }> = {
  iniciante:     { label: 'Iniciante',     color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  intermediario: { label: 'Intermediário', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  avancado:      { label: 'Avançado',      color: 'bg-rose-50 text-rose-700 border-rose-200' },
}

export function CourseCard({
  id, title, description, thumbnail,
  duration, level, instructor, lessonsCount, progress = 0,
}: CourseCardProps) {
  const cfg = levelConfig[level] ?? { label: level, color: 'bg-surface text-secondary border-accent/20' }

  return (
    <Link href={`/dashboard/cursos/${id}`} className="block group" style={{ textDecoration: 'none' }}>
      <article
        className="bg-white border border-accent/20 overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(196,137,106,0.18)]"
        style={{ transform: 'translateY(0)', transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-neutral-100">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
          />

          {/* Play overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-xl">
              <Play size={16} className="text-accent ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Level badge */}
          <span className={`absolute top-3 left-3 text-[0.55rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1.5 border ${cfg.color}`}>
            {cfg.label}
          </span>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/15">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 bg-neutral-50">
          {/* Instructor */}
          <p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase text-accent mb-2">
            {instructor}
          </p>

          {/* Title */}
          <h3
            className="font-serif text-primary font-semibold leading-snug mb-2 text-[0.98rem] flex-1"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-secondary/70 text-[0.74rem] leading-relaxed mb-4"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {description}
          </p>

          {/* Progress (when > 0) */}
          {progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[0.6rem] font-semibold text-secondary/60 tracking-wide uppercase">Progresso</span>
                <span className="text-[0.65rem] font-bold text-accent">{progress}%</span>
              </div>
              <div className="h-1.5 bg-neutral-200 overflow-hidden">
                <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
            <span className="flex items-center gap-1.5 text-[0.63rem] text-secondary/60 font-medium">
              <Clock size={10} strokeWidth={1.5} className="text-accent" />
              {duration}
            </span>
            <span className="w-px h-3 bg-neutral-300" />
            <span className="flex items-center gap-1.5 text-[0.63rem] text-secondary/60 font-medium">
              <BookOpen size={10} strokeWidth={1.5} className="text-accent" />
              {lessonsCount} {lessonsCount === 1 ? 'aula' : 'aulas'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
