"use client"

import { Menu, Bell, Search } from 'lucide-react'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header
      className="h-[60px] border-b border-accent/12 bg-bg/97 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-5 sm:px-7 gap-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-secondary hover:text-accent transition-colors p-1 shrink-0"
      >
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative flex items-center">
        <Search size={13} className="absolute left-3.5 text-secondary/40 pointer-events-none" />
        <input
          type="search"
          placeholder="Buscar cursos..."
          className="w-full h-9 pl-9 pr-4 bg-surface border-b border-accent/20 outline-none text-[0.82rem] text-primary placeholder:text-secondary/35 focus:border-accent transition-colors duration-200"
          style={{ fontFamily: "'Outfit', sans-serif", borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="relative w-9 h-9 border border-accent/15 flex items-center justify-center text-secondary hover:border-accent/40 hover:text-accent transition-all duration-200">
          <Bell size={14} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>
      </div>
    </header>
  )
}
