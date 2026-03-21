"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFFDF9',
          flexDirection: 'column',
          gap: '1.2rem',
          fontFamily: "'Jost', sans-serif",
        }}
      >
        <Loader2
          size={28}
          style={{ color: '#C9A55A', animation: 'spin 1s linear infinite' }}
        />
        <p
          style={{
            fontSize: '.72rem',
            fontWeight: 500,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: 'rgba(138,101,72,.5)',
          }}
        >
          Carregando...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user) return null

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#FFFDF9',
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
