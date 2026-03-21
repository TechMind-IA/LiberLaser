'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'

const OWNER_PHOTO = '/fundadora.jpg'

export default function LoginPage() {
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState('')
  const { login, isLoading }            = useAuth()
  const router                          = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch {
      setError('Email ou senha inválidos. Tente novamente.')
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans bg-bg">

      {/* ── Coluna esquerda: Formulário ── */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 lg:border-r border-(--color-border)">

        {/* Wrapper com largura máxima centrado no mobile */}
        <div className="w-full max-w-md mx-auto">

          {/* Logo */}
          <Link href="/" className="flex justify-center mb-8 sm:mb-12">
            <Image
              src="/logo.png"
              alt="Liber Laser Academy"
              width={200}
              height={72}
              className="object-contain h-28 sm:h-36 lg:h-42 w-auto"
              priority
            />
          </Link>

          {/* Label */}
          <p className="flex items-center gap-3 text-accent text-[0.68rem] font-semibold tracking-[0.28em] uppercase mb-4 sm:mb-5">
            <span className="w-6 h-px bg-accent shrink-0" />
            Área do aluno
          </p>

          {/* Título */}
          <h1 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl mb-3">
            Bem-vinda<br />
            <em className="text-accent not-italic">de volta.</em>
          </h1>

          <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
            Entre para acessar seus cursos e continuar evoluindo.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">

            {/* Erro */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 sm:h-13 px-4 bg-surface border border-(--color-border) text-primary text-sm outline-none focus:border-accent transition-colors duration-200 placeholder:text-muted w-full"
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-secondary"
                >
                  Senha
                </label>
                <Link
                  href="/esqueci-senha"
                  className="text-[0.72rem] font-medium text-accent hover:underline underline-offset-4 transition-all"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 sm:h-13 px-4 pr-12 bg-surface border border-(--color-border) text-primary text-sm outline-none focus:border-accent transition-colors duration-200 placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 sm:h-13 mt-1 bg-accent text-bg text-[0.75rem] font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar na plataforma'
              )}
            </button>
          </form>

          {/* Rodapé do form */}
          <p className="mt-7 text-sm text-secondary text-center lg:text-left">
            Não tem acesso?{' '}
            <a
              href="https://wa.me/55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline underline-offset-4"
            >
              Fale com nossa equipe
            </a>
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link
              href="/"
              className="mt-4 text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted hover:text-secondary transition-colors duration-200"
            >
              ← Voltar ao site
            </Link>
          </div>

        </div>
      </div>

      {/* ── Coluna direita: Foto — apenas desktop ── */}
      <div className="relative hidden lg:block overflow-hidden bg-primary">

        <Image
          src={OWNER_PHOTO}
          alt="Fundadora da Liber Laser Academy"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradiente base */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/10 to-transparent" />

        {/* Borda interna decorativa */}
        <div className="absolute inset-4 border border-accent/20 pointer-events-none" />

        {/* Badge topo */}
        <div className="absolute top-8 left-8 z-10">
          <span className="bg-accent text-bg text-[0.68rem] font-bold tracking-[0.22em] uppercase px-4 py-1.5">
            Plataforma exclusiva
          </span>
        </div>

        {/* Texto base */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <blockquote className="border-l-2 border-accent/50 pl-5 mb-4">
            <p className="font-serif text-bg italic text-xl xl:text-2xl leading-relaxed">
              "Tecnologia laser a serviço do seu negócio — com método, suporte e resultado real."
            </p>
          </blockquote>
          <p className="text-accent text-[0.72rem] font-bold tracking-[0.18em] uppercase pl-5">
            Brenda Kethllen · Liber Laser Academy
          </p>
        </div>
      </div>

    </main>
  )
}
