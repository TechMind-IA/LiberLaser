"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'


const OWNER_PHOTO = "/fundadora.jpg"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

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
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        fontFamily: "'Jost', sans-serif",
        background: '#FFFDF9',
      }}
    >
      {/* ── Left: Form ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 6% 4rem 8%',
          borderRight: '1px solid rgba(201,165,90,.15)',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '4rem' }}>
            <Image
              src="/logo.png"
              alt="Liber Laser Academy"
              width={250}
              height={86}
              style={{ objectFit: "contain", display: "block" }}
              priority
            />
        </Link>

        {/* Label */}
        <p
          style={{
            fontSize: '.68rem',
            fontWeight: 600,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: '#C9A55A',
            marginBottom: '.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.7rem',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: '#C9A55A',
              flexShrink: 0,
            }}
          />
          Área do aluno
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: '#1E0F05',
            marginBottom: '.6rem',
          }}
        >
          Bem-vinda
          <br />
          <em style={{ color: '#C9A55A', fontStyle: 'italic', fontWeight: 400 }}>
            de volta.
          </em>
        </h1>

        <p
          style={{
            fontSize: '.9rem',
            fontWeight: 400,
            color: '#8A6548',
            lineHeight: 1.7,
            marginBottom: '2.8rem',
          }}
        >
          Entre para acessar seus cursos e continuar evoluindo.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {error && (
            <div
              style={{
                padding: '1rem 1.2rem',
                background: 'rgba(180,60,40,.06)',
                border: '1px solid rgba(180,60,40,.15)',
                fontSize: '.82rem',
                color: '#b43c28',
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <label
              htmlFor="email"
              style={{
                fontSize: '.65rem',
                fontWeight: 600,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#8A6548',
              }}
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
              style={{
                height: 52,
                padding: '0 1rem',
                background: '#F5EDE2',
                border: '1px solid transparent',
                borderBottom: '1.5px solid rgba(201,165,90,.3)',
                outline: 'none',
                fontFamily: "'Jost', sans-serif",
                fontSize: '.92rem',
                fontWeight: 400,
                color: '#1E0F05',
                transition: 'border-color .2s, background .2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = '#C9A55A'
                e.currentTarget.style.background = '#EDE0D0'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(201,165,90,.3)'
                e.currentTarget.style.background = '#F5EDE2'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '.65rem',
                  fontWeight: 600,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: '#8A6548',
                }}
              >
                Senha
              </label>
              <Link
                href="/esqueci-senha"
                style={{
                  fontSize: '.72rem',
                  fontWeight: 500,
                  color: '#C9A55A',
                  textDecoration: 'none',
                  letterSpacing: '.05em',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#C9A55A')}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: 52,
                  padding: '0 3rem 0 1rem',
                  background: '#F5EDE2',
                  border: '1px solid transparent',
                  borderBottom: '1.5px solid rgba(201,165,90,.3)',
                  outline: 'none',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '.92rem',
                  fontWeight: 400,
                  color: '#1E0F05',
                  boxSizing: 'border-box',
                  transition: 'border-color .2s, background .2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = '#C9A55A'
                  e.currentTarget.style.background = '#EDE0D0'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'rgba(201,165,90,.3)'
                  e.currentTarget.style.background = '#F5EDE2'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8A6548',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  transition: 'color .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A55A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A6548')}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '.6rem',
              height: 52,
              background: isLoading ? 'rgba(201,165,90,.6)' : '#C9A55A',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: "'Jost', sans-serif",
              fontSize: '.78rem',
              fontWeight: 600,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: '#1E0F05',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.6rem',
              transition: 'background .2s, transform .1s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) (e.currentTarget.style.background = '#B8924A')
            }}
            onMouseLeave={(e) => {
              if (!isLoading) (e.currentTarget.style.background = '#C9A55A')
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                Entrando...
              </>
            ) : (
              'Entrar na plataforma'
            )}
          </button>
        </form>

        {/* Footer link */}
        <p
          style={{
            marginTop: '2.5rem',
            fontSize: '.8rem',
            fontWeight: 400,
            color: '#8A6548',
            lineHeight: 1.6,
          }}
        >
          Não tem acesso?{' '}
          <a
            href="https://wa.me/55"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#C9A55A',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid transparent',
              transition: 'border-color .2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#C9A55A')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
          >
            Fale com nossa equipe
          </a>
        </p>

        {/* Back to site */}
        <Link
          href="/"
          style={{
            marginTop: '1.2rem',
            fontSize: '.68rem',
            fontWeight: 500,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'rgba(138,101,72,.5)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.5rem',
            transition: 'color .2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#8A6548')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(138,101,72,.5)')}
        >
          ← Voltar ao site
        </Link>
      </div>

      {/* ── Right: Owner Photo ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#1E0F05',
        }}
      >
        {/* Foto — ocupa todo o painel */}
        <Image
          src={OWNER_PHOTO}
          alt="Fundadora da Liber Laser Academy"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />

        {/* Gradiente suave na base para o texto ficar legível */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(30,15,5,.85) 0%, rgba(30,15,5,.1) 55%, transparent 100%)',
            zIndex: 1,
          }}
        />

        {/* Borda decorativa interna dourada */}
        <div
          style={{
            position: 'absolute',
            inset: 16,
            border: '1px solid rgba(201,165,90,.2)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Badge topo */}
        <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 3 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '.80rem',
              fontWeight: 700,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              background: '#C9A55A',
              color: '#1E0F05',
              padding: '.3rem 1rem',
            }}
          >
            Plataforma exclusiva
          </span>
        </div>

        {/* Texto na base */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 36,
            right: 36,
            zIndex: 3,
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.50rem',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.75,
              marginBottom: '.7rem',
              borderLeft: '2px solid rgba(201,165,90,.5)',
              paddingLeft: '1.1rem',
            }}
          >
            "Tecnologia laser a serviço do seu negócio — com método, suporte e resultado real."
          </p>
          <p
            style={{
              fontSize: '.90rem',
              fontWeight: 600,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'rgba(201,165,90,.75)',
              paddingLeft: '1.1rem',
            }}
          >
            Brenda Kethllen · Liber Laser Academy
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          main { grid-template-columns: 1fr !important; }
          main > div:last-child { display: none !important; }
          main > div:first-child { padding: 3rem 6% !important; }
        }
      `}</style>
    </main>
  )
}
