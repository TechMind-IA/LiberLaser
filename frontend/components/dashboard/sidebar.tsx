"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { Home, BookOpen, Award, User, Settings, LogOut, X } from 'lucide-react'

interface DashboardSidebarProps {
  open: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Home,     label: 'Início',        href: '/dashboard' },
  { icon: BookOpen, label: 'Meus Cursos',   href: '/dashboard/cursos' },
  { icon: Award,    label: 'Certificados',  href: '/dashboard/certificados' },
  { icon: User,     label: 'Perfil',        href: '/dashboard/perfil' },
  { icon: Settings, label: 'Configurações', href: '/dashboard/configuracoes' },
]

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const initial = user?.name?.charAt(0).toUpperCase() ?? 'U'

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(30,15,5,.55)',
            zIndex: 40,
            backdropFilter: 'blur(2px)',
          }}
          className="lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 272,
          background: '#1E0F05',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexShrink: 0,
          borderRight: '1px solid rgba(201,165,90,.12)',
          fontFamily: "'Jost', sans-serif",
          zIndex: 50,
          transition: 'transform .3s ease',
        }}
        className={cn(
          'fixed lg:relative',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header / Logo */}
        <div
          style={{
            padding: '2rem 1.8rem 1.8rem',
            borderBottom: '1px solid rgba(201,165,90,.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#FFFDF9',
                letterSpacing: '.01em',
              }}
            >
              Liber{' '}
              <em style={{ color: '#C9A55A', fontStyle: 'italic', fontWeight: 400 }}>
                Laser
              </em>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(245,240,232,.4)',
              display: 'flex',
              padding: 4,
              transition: 'color .2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A55A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,.4)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div
          style={{
            padding: '1.4rem 1.8rem',
            borderBottom: '1px solid rgba(201,165,90,.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              flexShrink: 0,
              border: '1.5px solid rgba(201,165,90,.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '.95rem',
                fontWeight: 600,
                color: '#C9A55A',
              }}
            >
              {initial}
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontSize: '.82rem',
                fontWeight: 600,
                color: '#FFFDF9',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name ?? 'Usuária'}
            </p>
            <p
              style={{
                fontSize: '.7rem',
                fontWeight: 400,
                color: 'rgba(245,240,232,.35)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: 2,
                letterSpacing: '.03em',
              }}
            >
              {user?.email ?? ''}
            </p>
          </div>
        </div>

        {/* Nav label */}
        <div style={{ padding: '1.4rem 1.8rem .6rem' }}>
          <span
            style={{
              fontSize: '.58rem',
              fontWeight: 600,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,165,90,.45)',
            }}
          >
            Menu
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 .9rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.85rem',
                      padding: '.75rem 1rem',
                      textDecoration: 'none',
                      fontSize: '.82rem',
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '.04em',
                      color: isActive ? '#C9A55A' : 'rgba(245,240,232,.5)',
                      background: isActive ? 'rgba(201,165,90,.08)' : 'transparent',
                      borderLeft: isActive ? '2px solid #C9A55A' : '2px solid transparent',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(245,240,232,.85)'
                        e.currentTarget.style.background = 'rgba(201,165,90,.04)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(245,240,232,.5)'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    <item.icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Divider ornamental */}
        <div style={{ margin: '0 1.8rem', height: '1px', background: 'rgba(201,165,90,.1)' }} />

        {/* Logout */}
        <div style={{ padding: '1.2rem .9rem 1.8rem' }}>
          <button
            onClick={() => { logout(); window.location.href = '/' }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '.85rem',
              padding: '.75rem 1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '.82rem',
              fontWeight: 400,
              letterSpacing: '.04em',
              color: 'rgba(245,240,232,.3)',
              borderLeft: '2px solid transparent',
              fontFamily: "'Jost', sans-serif",
              transition: 'all .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#e05c4a'
              e.currentTarget.style.background = 'rgba(224,92,74,.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,240,232,.3)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <LogOut size={15} strokeWidth={1.5} />
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  )
}
