"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { strapiLogin, strapiRegister } from '@/lib/strapi'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('beleza_user')
    const storedJwt = localStorage.getItem('beleza_jwt')
    if (storedUser && storedJwt) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await strapiLogin(email, password)

      const userData: User = {
        id: String((data.user as any).id),
        name: (data.user as any).username ?? email.split('@')[0],
        email: (data.user as any).email,
      }

      setUser(userData)
      localStorage.setItem('beleza_user', JSON.stringify(userData))
      localStorage.setItem('beleza_jwt', data.jwt)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await strapiRegister(name, email, password)

      const userData: User = {
        id: String((data.user as any).id),
        name: (data.user as any).username ?? name,
        email: (data.user as any).email,
      }

      setUser(userData)
      localStorage.setItem('beleza_user', JSON.stringify(userData))
      localStorage.setItem('beleza_jwt', data.jwt)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('beleza_user')
    localStorage.removeItem('beleza_jwt')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
