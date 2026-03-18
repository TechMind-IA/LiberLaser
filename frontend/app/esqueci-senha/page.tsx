"use client"

import { useState } from 'react'
import Link from 'next/link'
import { strapiForgotPassword } from '@/lib/strapi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await strapiForgotPassword(email)
      setSent(true)
    } catch {
      setError('Não foi possível enviar o email. Verifique o endereço e tente novamente.')
    } finally {
      setIsLoading(false)
    }
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

        {sent ? (
          /* Estado de sucesso */
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Email enviado!
            </h1>
            <p className="mt-3 text-muted-foreground">
              Enviámos um link de recuperação para{' '}
              <span className="font-medium text-foreground">{email}</span>.
              Verifique a sua caixa de entrada e a pasta de spam.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              O link expira em 1 hora.
            </p>
            <Link href="/login" className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Link>
          </div>
        ) : (
          /* Formulário */
          <>
            <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Link>

            <h1 className="text-3xl font-serif font-bold text-foreground">
              Recuperar senha
            </h1>
            <p className="mt-2 text-muted-foreground">
              Insira o email da sua conta e enviaremos um link para redefinir a sua senha.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar link de recuperação'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
