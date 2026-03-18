"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { strapiResetPassword } from '@/lib/strapi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function RedefinirSenhaPage() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') ?? ''
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (!code) {
      setError('Link inválido ou expirado. Solicite um novo link de recuperação.')
      return
    }

    setIsLoading(true)
    try {
      await strapiResetPassword(code, password, passwordConfirmation)
      setDone(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setError('Não foi possível redefinir a senha. O link pode ter expirado. Solicite um novo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!code) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-block mb-8">
            <span className="text-2xl font-serif font-bold text-foreground">
              Beleza<span className="text-primary">Academy</span>
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-foreground">Link inválido</h1>
          <p className="mt-3 text-muted-foreground">
            Este link de recuperação é inválido ou já expirou.
          </p>
          <Link
            href="/esqueci-senha"
            className="mt-6 inline-block text-sm text-primary hover:underline"
          >
            Solicitar novo link
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-serif font-bold text-foreground">
            Beleza<span className="text-primary">Academy</span>
          </span>
        </Link>

        {done ? (
          /* Sucesso */
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Senha redefinida!
            </h1>
            <p className="mt-3 text-muted-foreground">
              A sua senha foi actualizada com sucesso. A redirecionar para o login…
            </p>
          </div>
        ) : (
          /* Formulário */
          <>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Nova senha
            </h1>
            <p className="mt-2 text-muted-foreground">
              Escolha uma nova senha para a sua conta.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmation">Confirmar nova senha</Label>
                <div className="relative">
                  <Input
                    id="confirmation"
                    type={showConfirmation ? 'text' : 'password'}
                    placeholder="Repita a nova senha"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(!showConfirmation)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmation ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showConfirmation ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A guardar...
                  </>
                ) : (
                  'Redefinir senha'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
