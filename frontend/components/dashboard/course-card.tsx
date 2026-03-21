import Link from 'next/link'
import { Clock, BookOpen, BarChart } from 'lucide-react'

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

const levelColor: Record<string, string> = {
  iniciante:     '#7aab6e',
  intermediario: '#C9A55A',
  avancado:      '#b87a4e',
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
  progress = 0,
}: CourseCardProps) {
  const label = levelLabel[level] ?? level
  const accent = levelColor[level] ?? '#C9A55A'

  return (
    <Link href={`/dashboard/cursos/${id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{
          background: '#FFFDF9',
          border: '1px solid rgba(201,165,90,.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Jost', sans-serif",
          transition: 'box-shadow .25s, border-color .25s, transform .25s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = '0 8px 32px rgba(30,15,5,.1)'
          el.style.borderColor = 'rgba(201,165,90,.4)'
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = 'none'
          el.style.borderColor = 'rgba(201,165,90,.15)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Thumbnail */}
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#F5EDE2' }}>
          <img
            src={thumbnail}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform .5s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Level badge */}
          <span
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontSize: '.58rem',
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              background: accent,
              color: '#1E0F05',
              padding: '.25rem .75rem',
            }}
          >
            {label}
          </span>

          {/* Progress bar overlay */}
          {progress > 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'rgba(30,15,5,.3)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: '#C9A55A',
                  transition: 'width .6s ease',
                }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.3rem 1.4rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#1E0F05',
              lineHeight: 1.35,
              marginBottom: '.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: '.8rem',
              fontWeight: 400,
              color: '#8A6548',
              lineHeight: 1.65,
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {description}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '.9rem',
              borderTop: '1px solid rgba(201,165,90,.12)',
            }}
          >
            {[
              { icon: Clock,     text: duration },
              { icon: BookOpen,  text: `${lessonsCount} aulas` },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.35rem',
                  fontSize: '.72rem',
                  fontWeight: 500,
                  color: 'rgba(138,101,72,.6)',
                  letterSpacing: '.03em',
                }}
              >
                <Icon size={12} strokeWidth={1.5} />
                {text}
              </span>
            ))}

            {progress > 0 && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '.68rem',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  color: '#C9A55A',
                }}
              >
                {progress}%
              </span>
            )}
          </div>

          {/* Instructor */}
          <p
            style={{
              marginTop: '.7rem',
              fontSize: '.7rem',
              fontWeight: 400,
              color: 'rgba(138,101,72,.5)',
              letterSpacing: '.03em',
            }}
          >
            Por{' '}
            <span style={{ fontWeight: 600, color: '#8A6548' }}>{instructor}</span>
          </p>
        </div>
      </article>
    </Link>
  )
}
