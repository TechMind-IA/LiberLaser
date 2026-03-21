"use client"

import { Menu, Bell, Search } from 'lucide-react'

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header
      style={{
        height: 64,
        borderBottom: '1px solid rgba(201,165,90,.12)',
        background: 'rgba(255,253,249,.97)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        fontFamily: "'Jost', sans-serif",
        gap: '1.5rem',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#8A6548',
          display: 'flex',
          alignItems: 'center',
          padding: 4,
          flexShrink: 0,
          transition: 'color .2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A55A')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#8A6548')}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Search
          size={14}
          style={{
            position: 'absolute',
            left: '1rem',
            color: 'rgba(138,101,72,.45)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="search"
          placeholder="Buscar cursos..."
          style={{
            width: '100%',
            height: 38,
            paddingLeft: '2.5rem',
            paddingRight: '1rem',
            background: '#F5EDE2',
            border: '1px solid transparent',
            borderBottom: '1.5px solid rgba(201,165,90,.2)',
            outline: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: '.82rem',
            fontWeight: 400,
            color: '#1E0F05',
            transition: 'border-color .2s, background .2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderBottomColor = '#C9A55A'
            e.currentTarget.style.background = '#EDE0D0'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderBottomColor = 'rgba(201,165,90,.2)'
            e.currentTarget.style.background = '#F5EDE2'
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexShrink: 0 }}>
        <button
          style={{
            position: 'relative',
            width: 38,
            height: 38,
            background: 'none',
            border: '1px solid rgba(201,165,90,.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8A6548',
            transition: 'all .2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,165,90,.4)'
            e.currentTarget.style.color = '#C9A55A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(201,165,90,.15)'
            e.currentTarget.style.color = '#8A6548'
          }}
        >
          <Bell size={15} strokeWidth={1.5} />
          {/* Notification dot */}
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 5,
              height: 5,
              background: '#C9A55A',
              borderRadius: '50%',
            }}
          />
        </button>
      </div>
    </header>
  )
}
