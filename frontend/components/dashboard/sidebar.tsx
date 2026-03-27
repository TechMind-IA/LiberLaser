"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { LayoutGrid, BookOpen, User, Settings, LogOut, X } from 'lucide-react'

interface DashboardSidebarProps {
  open: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutGrid, label: 'Início',        href: '/dashboard' },
  { icon: BookOpen,   label: 'Meus Cursos',   href: '/dashboard/cursos' },
  { icon: User,       label: 'Perfil',        href: '/dashboard/perfil' },
  { icon: Settings,   label: 'Configurações', href: '/dashboard/configuracoes' },
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
          className="fixed inset-0 bg-primary/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          'fixed lg:relative w-[260px] bg-primary flex flex-col h-screen',
          'border-r border-accent/10 z-50 transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Logo */}
        <div className="px-5 py-4 border-b border-accent/8 flex items-center justify-between">
          <Link href="/dashboard" className="block">
            <img
              src="/logo.png"
              alt="Liber Laser Academy"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-bg/30 hover:text-accent transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-3.5 border-b border-accent/8 flex items-center gap-3">
          <div className="w-8 h-8 border border-accent/40 flex items-center justify-center shrink-0">
            <span className="font-serif text-accent text-sm font-semibold">{initial}</span>
          </div>
          <div className="min-w-0">
            <p className="text-bg text-[0.78rem] font-semibold truncate">{user?.name ?? 'Usuária'}</p>
            <p className="text-bg/30 text-[0.65rem] truncate mt-0.5">{user?.email ?? ''}</p>
          </div>
        </div>

        {/* Nav label */}
        <p className="px-5 pt-4 pb-1 text-[0.55rem] font-bold tracking-[0.22em] uppercase text-accent/40">
          Menu
        </p>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-2 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-[0.78rem] transition-all duration-150',
                      'border-l-2',
                      isActive
                        ? 'text-accent font-semibold border-l-accent bg-accent/8'
                        : 'text-bg/45 font-normal border-l-transparent hover:text-bg/80 hover:bg-accent/4'
                    )}
                  >
                    <item.icon size={14} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mx-5 h-px bg-accent/8" />

        {/* Logout */}
        <div className="px-3 py-4">
          <button
            onClick={() => { logout(); window.location.href = '/' }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[0.75rem] text-bg/25 hover:text-red-400 transition-colors border-l-2 border-l-transparent"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <LogOut size={14} strokeWidth={1.5} className="shrink-0" />
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  )
}
