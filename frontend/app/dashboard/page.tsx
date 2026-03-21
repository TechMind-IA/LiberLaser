"use client"

import { CourseCard } from '@/components/dashboard/course-card'
import { useAuth } from '@/contexts/auth-context'
import { useCourses } from '@/hooks/use-courses'
import { getThumbnailUrl } from '@/lib/strapi'
import { BookOpen, Clock, Award, TrendingUp, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const { courses, isLoading } = useCourses()

  const totalLessons = courses.reduce(
    (acc, course) =>
      acc + (course.modules?.reduce((a, m) => a + (m.lessons?.length ?? 0), 0) ?? 0),
    0
  )

  const stats = [
    { icon: BookOpen,    label: 'Cursos disponíveis', value: String(courses.length) },
    { icon: Clock,       label: 'Horas de conteúdo',  value: `${courses.length * 8}h` },
    { icon: Award,       label: 'Certificados',        value: '0' },
    { icon: TrendingUp,  label: 'Total de aulas',      value: String(totalLessons) },
  ]

  const firstName = user?.name?.split(' ')[0] ?? 'bem-vinda'

  return (
    <div
      style={{
        padding: '2.5rem 2.5rem 4rem',
        fontFamily: "'Jost', sans-serif",
        maxWidth: 1200,
      }}
    >
      {/* ── Welcome ── */}
      <div style={{ marginBottom: '2.8rem' }}>
        <p
          style={{
            fontSize: '.65rem',
            fontWeight: 600,
            letterSpacing: '.25em',
            textTransform: 'uppercase',
            color: '#C9A55A',
            marginBottom: '.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.6rem',
          }}
        >
          <span style={{ display: 'block', width: 18, height: 1.5, background: '#C9A55A', flexShrink: 0 }} />
          Painel
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: '#1E0F05',
          }}
        >
          Olá, {firstName}.
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#C9A55A' }}>
            Continue evoluindo.
          </em>
        </h1>
      </div>

      {/* ── Stats ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          background: 'rgba(201,165,90,.1)',
          marginBottom: '3rem',
        }}
        className="stats-grid"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#FFFDF9',
              padding: '1.6rem 1.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.9rem',
              transition: 'background .2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F5EDE2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFDF9')}
          >
            <div
              style={{
                width: 38,
                height: 38,
                border: '1.5px solid rgba(201,165,90,.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C9A55A',
              }}
            >
              <stat.icon size={16} strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.7rem',
                  fontWeight: 600,
                  color: '#1E0F05',
                  lineHeight: 1,
                  marginBottom: '.3rem',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: '.7rem',
                  fontWeight: 500,
                  letterSpacing: '.08em',
                  color: 'rgba(138,101,72,.6)',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Courses ── */}
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', gap: '.8rem', color: '#8A6548' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '.85rem', letterSpacing: '.06em' }}>Carregando cursos...</span>
        </div>
      ) : courses.length > 0 ? (
        <section>
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '1.8rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '.62rem',
                  fontWeight: 600,
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,165,90,.6)',
                  marginBottom: '.4rem',
                }}
              >
                Catálogo
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: '#1E0F05',
                }}
              >
                Todos os cursos
              </h2>
            </div>

            <Link
              href="/dashboard/cursos"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                fontSize: '.7rem',
                fontWeight: 600,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: '#C9A55A',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,165,90,.3)',
                paddingBottom: 2,
                transition: 'border-color .2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#C9A55A')}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(201,165,90,.3)')}
            >
              Ver todos
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {courses.map((course) => {
              const lessonsCount =
                course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length ?? 0), 0) ?? 0

              return (
                <CourseCard
                  key={course.id}
                  id={course.slug}
                  title={course.title}
                  description={course.description}
                  thumbnail={getThumbnailUrl(course)}
                  duration={course.duration}
                  level={course.level}
                  instructor={course.instructor}
                  lessonsCount={lessonsCount}
                  progress={0}
                />
              )
            })}
          </div>
        </section>
      ) : (
        <div
          style={{
            padding: '5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(201,165,90,.15)',
            background: '#F5EDE2',
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#8A6548',
            }}
          >
            Nenhum curso disponível no momento.
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
