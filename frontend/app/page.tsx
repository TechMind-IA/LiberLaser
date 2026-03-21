'use client'

import { useState } from 'react'
import PublicHeader from '@/components/public-header'
import Footer from '@/components/footer'

// ─── Dados — FAQ ───────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'Preciso ter experiência com laser para começar?',
    a: 'Não. A formação incluída no plano te prepara completamente para atender com segurança e confiança, mesmo sem experiência prévia com laser.',
  },
  {
    q: 'O clareamento está incluso em todos os planos?',
    a: 'O protocolo de clareamento está disponível a partir do plano Platinum (semestral). O equipamento permite realizar o procedimento em todos os planos, mas o protocolo e a formação específica são incluídos no Platinum e Black.',
  },
  {
    q: 'A máquina UltraFiber LM-L808A é segura?',
    a: 'Sim. Utilizamos equipamento profissional com tecnologia de diodo 808 nm, parâmetros ajustáveis e protocolos adequados para cada tipo de pele.',
  },
  {
    q: 'Consigo pagar com cartão?',
    a: 'Sim. Aceitamos cartão e outras formas de pagamento. Entre em contato para conhecer todas as condições disponíveis.',
  },
  {
    q: 'Como funciona a logística da locação?',
    a: 'Você escolhe o plano (6h ou 12h por mês), agenda as datas conforme sua prioridade de plano e utiliza com protocolos organizados para maximizar seus atendimentos.',
  },
]

// ─── Dados — Planos ────────────────────────────────────────────────────────────
const planos = [
  {
    periodo: 'Mensal',
    nome: 'Classic',
    preco6h: 'R$ 620',
    preco12h: 'R$ 950',
    destaque: false,
    prioridade: 'Prioridade 4',
    features: [
      'Locação do equipamento',
      'Treinamento básico',
      'Prioridade 4 no agendamento',
    ],
    extras: [] as string[],
  },
  {
    periodo: 'Trimestral',
    nome: 'Gold',
    preco6h: 'R$ 560',
    preco12h: 'R$ 860',
    destaque: false,
    prioridade: 'Prioridade 3',
    features: [
      'Locação do equipamento',
      'Treinamento operacional',
      'Protocolos de depilação',
      'Grupo VIP',
      'Prioridade 3 no agendamento',
    ],
    extras: [] as string[],
  },
  {
    periodo: 'Semestral',
    nome: 'Platinum',
    preco6h: 'R$ 495',
    preco12h: 'R$ 760',
    destaque: true,
    badge: 'Mais escolhido',
    prioridade: 'Prioridade 2',
    features: [
      'Locação do equipamento',
      'Treinamento operacional',
      'Protocolos de depilação',
      'Protocolos de clareamento',
      'Grupo VIP',
      'Prioridade 2 no agendamento',
    ],
    extras: [] as string[],
  },
  {
    periodo: 'Anual',
    nome: 'Black',
    preco6h: 'R$ 430',
    preco12h: 'R$ 660',
    destaque: false,
    prioridade: 'Prioridade 1 — Máxima',
    features: [
      'Locação do equipamento',
      'Treinamento operacional',
      'Protocolos de depilação',
      'Protocolos de clareamento',
      'Grupo VIP',
      'Prioridade 1 no agendamento',
      'Curso completo (R$500 off)',
      '1 Mentoria VIP individual',
    ],
    extras: ['Curso completo (R$500 off)', '1 Mentoria VIP individual'],
  },
]

// ─── Dados — Diferenciais ──────────────────────────────────────────────────────
const diferenciais = [
  { num: '01', title: 'Formação em depilação',   desc: 'Capacitação teórica e prática para atender com segurança e confiança desde o primeiro atendimento.' },
  { num: '02', title: 'Formação em clareamento', desc: 'Protocolos exclusivos para ampliar o portfólio com procedimentos de alto valor percebido.' },
  { num: '03', title: 'Protocolos testados',      desc: 'Processos validados para padronizar atendimentos, reduzir erros e escalar os resultados.' },
  { num: '04', title: 'Suporte técnico',          desc: 'Acompanhamento contínuo durante todo o período de locação do equipamento.' },
  { num: '05', title: 'Grupo VIP',                desc: 'Comunidade exclusiva com conteúdos, atualizações e troca de experiências entre profissionais.' },
  { num: '06', title: 'Mentoria estratégica',     desc: 'Direcionamento personalizado para transformar tecnologia em resultado financeiro real.' },
]

// ─── Dados — Para Quem ─────────────────────────────────────────────────────────
const paraQuem = [
  'Deseja aumentar o faturamento mensal com serviços de alto valor percebido',
  'Busca uma nova fonte de renda sem investir alto na compra de equipamentos',
  'Quer oferecer depilação e clareamento a laser com boa margem de lucro',
  'Já atende estética, mas sente que está deixando dinheiro na mesa',
  'Busca formação profissional qualificada para trabalhar com segurança e clareza',
  'Precisa de orientação para transformar tecnologia em resultado financeiro real',
]

// ──────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-bg overflow-x-hidden font-sans">
      <PublicHeader />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="inicio"
        className="min-h-screen bg-bg flex items-center px-6 sm:px-10 lg:px-16 pt-20"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center py-8 lg:py-0">

          {/* Texto */}
          <div>
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-8">
              <span className="w-8 h-px bg-accent shrink-0" />
              Locação · Educação · Tecnologia
            </p>

            <h1 className="font-serif text-primary font-semibold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] mb-7">
              Tecnologia laser<br />
              a serviço do seu<br />
              <em className="text-accent not-italic">negócio.</em>
            </h1>

            <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              Alugamos equipamentos de laser profissional e formamos profissionais
              para que cada sessão se converta em resultado financeiro real —
              com suporte, método e segurança.
            </p>

            <div className="flex flex-nowrap gap-1">
              <a
                href="#planos"
                className="bg-accent text-bg text-[0.72rem] font-bold tracking-[0.16em] uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300"
              >
                Planos
              </a>
              <a
                href="https://wa.me/55"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--color-border)] text-secondary text-[0.72rem] font-semibold tracking-[0.16em] uppercase px-8 py-4 hover:border-accent hover:text-primary transition-all duration-300"
              >
                Entre em contato
              </a>
            </div>
          </div>

          {/* Vídeo */}
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border border-accent/20 pointer-events-none" />
            <div className="relative z-10">
              <video
                src="/video1.mp4"
                controls
                playsInline
                className="w-full block bg-surface"
              />
            </div>
            <p className="mt-4 text-center text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-muted">
              Conheça a Liber Laser Academy
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BARRA DE DESTAQUES
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-accent py-5 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-bg/20">
          {[
            { title: 'Locação profissional', sub: 'Equipamento sem compra' },
            { title: 'Formação completa',    sub: 'Depilação e clareamento' },
            { title: 'Suporte contínuo',     sub: 'Durante todo o processo' },
          ].map((item, i) => (
            <div key={i} className="text-center py-3 sm:py-1 px-4">
              <strong className="block font-serif text-bg text-lg sm:text-xl font-semibold">
                {item.title}
              </strong>
              <span className="text-bg/70 text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SOBRE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="sobre" className="bg-bg py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Decorativo */}
          <div className="relative h-72 sm:h-96 bg-surface border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
            <span className="font-serif text-[7rem] sm:text-[10rem] font-bold text-accent/8 italic select-none absolute pointer-events-none">
              Liber
            </span>
            <span className="font-serif text-secondary italic text-lg sm:text-xl relative z-10">
              Liber Laser Academy
            </span>
            <div className="absolute bottom-6 right-6 w-px h-20 bg-accent/25" />
            <div className="absolute top-6 left-6 w-20 h-px bg-accent/25" />
          </div>

          {/* Texto */}
          <div>
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-7">
              <span className="w-6 h-px bg-accent shrink-0" />
              Sobre nós
            </p>

            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl mb-7">
              Alugar é só<br />
              o <em className="text-accent not-italic">começo.</em>
            </h2>

            <p className="text-secondary text-base leading-relaxed mb-4">
              A Liber Laser Academy nasceu para apoiar clínicas e profissionais
              que desejam trabalhar com laser de forma consciente, segura e lucrativa.
            </p>
            <p className="text-secondary text-base leading-relaxed mb-10">
              Mais do que um equipamento, entregamos orientação, método e
              acompanhamento para que cada parceiro transforme a tecnologia em
              uma fonte real de renda.
            </p>

            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-serif text-secondary italic text-lg sm:text-xl leading-relaxed">
                "O que realmente importa é ver nossos parceiros evoluindo e prosperando."
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SERVIÇOS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="servicos" className="bg-surface py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
            <div>
              <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-7">
                <span className="w-6 h-px bg-accent shrink-0" />
                Serviços
              </p>
              <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl">
                Dois tratamentos.<br />
                <em className="text-accent not-italic">Infinitas</em> possibilidades.
              </h2>
            </div>
            <p className="text-secondary text-base leading-relaxed">
              A tecnologia 808 nm permite oferecer dois serviços de alta procura
              e alto valor percebido, ampliando seu portfólio sem elevar os custos
              operacionais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'Depilação a laser',
                desc: 'Tratamento recorrente com alta rotatividade. Sessões rápidas, seguras e protocolos organizados para maximizar a agenda e gerar receita previsível.',
                tags: ['Alta recorrência', '808 nm', 'Agenda cheia'],
              },
              {
                num: '02',
                title: 'Clareamento a laser',
                desc: 'Serviço de alto valor percebido e baixo custo operacional. Diferencial que eleva o ticket médio e posiciona sua clínica em um segmento premium.',
                tags: ['Alto ticket', 'Diferencial', 'Premium'],
              },
            ].map((s) => (
              <div
                key={s.num}
                className="bg-bg border border-[var(--color-border)] p-8 sm:p-12 hover:border-accent/50 transition-colors duration-300 group"
              >
                <p className="font-serif text-accent/60 text-sm font-semibold mb-8">{s.num}</p>

                <div className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center mb-8 group-hover:border-accent/50 transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                </div>

                <h3 className="font-serif text-primary text-2xl sm:text-3xl font-semibold mb-4">
                  {s.title}
                </h3>
                <p className="text-secondary text-sm sm:text-base leading-relaxed mb-8">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-accent text-[0.62rem] font-bold tracking-[0.16em] uppercase bg-accent/10 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DIFERENCIAIS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="diferenciais" className="bg-bg py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

          <div>
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-7">
              <span className="w-6 h-px bg-accent shrink-0" />
              Diferenciais
            </p>
            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
              Mais do que<br />
              uma <em className="text-accent not-italic">máquina.</em>
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Na Liber, você recebe um sistema completo para transformar a
              tecnologia em faturamento consistente.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)]">
            {diferenciais.map((item) => (
              <div
                key={item.num}
                className="bg-bg p-8 sm:p-10 hover:bg-surface transition-colors duration-300"
              >
                <p className="text-accent text-[0.68rem] font-bold tracking-[0.12em] mb-4">
                  {item.num}
                </p>
                <h4 className="text-primary font-semibold text-base mb-2">
                  {item.title}
                </h4>
                <p className="text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PARA QUEM
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-surface py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-6">
              Para quem é
            </p>
            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              A Liber foi criada<br />
              para <em className="text-accent not-italic">você</em> que...
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {paraQuem.map((text, i) => (
              <div
                key={i}
                className="bg-surface p-8 sm:p-10 hover:bg-bg transition-colors duration-300 group"
              >
                <span className="block text-accent/40 text-xl mb-4 group-hover:text-accent transition-colors duration-300">
                  →
                </span>
                <p className="text-secondary text-sm sm:text-base leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PLANOS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="planos" className="bg-bg py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-7">
                <span className="w-6 h-px bg-accent shrink-0" />
                Planos
              </p>
              <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl">
                Escolha o plano<br />
                <em className="text-accent not-italic">ideal</em> para você.
              </h2>
            </div>
            <p className="text-secondary text-base leading-relaxed">
              Todos os planos incluem a UltraFiber LM-L808A com 6 ou 12 horas mensais
              de uso, além de formação completa e suporte contínuo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
            {planos.map((p) => (
              <div
                key={p.nome}
                className={`flex flex-col p-8 transition-colors duration-300 hover:bg-surface ${
                  p.destaque
                    ? 'bg-surface border-t-2 border-t-accent'
                    : 'bg-bg'
                }`}
              >
                {'badge' in p && p.badge && (
                  <span className="self-start bg-accent text-bg text-[0.58rem] font-bold tracking-[0.16em] uppercase px-3 py-1 mb-5">
                    {p.badge}
                  </span>
                )}

                <p className="text-accent text-[0.62rem] font-semibold tracking-[0.22em] uppercase mb-1">
                  {p.periodo}
                </p>
                <h3 className="font-serif text-primary text-2xl sm:text-3xl font-semibold mb-5">
                  {p.nome}
                </h3>

                <div className="font-serif text-accent text-3xl font-semibold leading-none mb-1">
                  {p.preco6h}
                </div>
                <p className="text-muted text-xs mb-7">
                  ou {p.preco12h} com 12h/mês
                </p>

                <div className="h-px bg-[var(--color-border)] mb-7" />

                <ul className="flex-1 space-y-3 mb-7">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-sm leading-snug ${
                        p.extras.includes(f) ? 'text-accent font-semibold' : 'text-secondary'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          p.extras.includes(f) ? 'bg-accent' : 'border border-accent/40'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="text-muted text-[0.62rem] font-semibold tracking-[0.12em] uppercase">
                  {p.prioridade}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://wa.me/55"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-bg text-[0.72rem] font-bold tracking-[0.16em] uppercase px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Quero começar agora
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-surface py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Intro */}
          <div>
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-7">
              <span className="w-6 h-px bg-accent shrink-0" />
              Dúvidas
            </p>
            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
              Perguntas<br />
              <em className="text-accent not-italic">frequentes.</em>
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Ainda tem alguma dúvida? Entre em contato pelo WhatsApp — nossa
              equipe responde na hora.
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--color-border)]">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-8 py-6 text-left group"
                >
                  <span
                    className={`text-sm sm:text-base leading-snug transition-colors duration-200 ${
                      faqOpen === i ? 'text-primary' : 'text-secondary group-hover:text-primary'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`w-7 h-7 shrink-0 rounded-full border flex items-center justify-center text-accent text-base transition-colors duration-200 ${
                      faqOpen === i ? 'border-accent bg-accent/10' : 'border-[var(--color-border)]'
                    }`}
                  >
                    {faqOpen === i ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    faqOpen === i ? 'max-h-60 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-primary py-28 lg:py-44 px-6 sm:px-10 lg:px-16 text-center relative overflow-hidden">

        {/* Ornamento de fundo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[8rem] sm:text-[14rem] lg:text-[18rem] font-bold text-accent/5 italic whitespace-nowrap">
            Liber
          </span>
        </div>

        <div className="absolute top-1/2 left-0 w-20 h-px bg-accent/10 hidden lg:block" />
        <div className="absolute top-1/2 right-0 w-20 h-px bg-accent/10 hidden lg:block" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="flex items-center justify-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-8">
            <span className="w-6 h-px bg-accent shrink-0" />
            Próximo passo
          </p>

          <h2 className="font-serif text-bg font-semibold leading-tight text-3xl sm:text-5xl lg:text-6xl mb-7">
            Pronta para{' '}
            <em className="text-accent not-italic">transformar</em>{' '}
            tecnologia em faturamento?
          </h2>

          <p className="text-bg/60 text-base sm:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Fale com nossa equipe e descubra qual plano se encaixa melhor
            no momento da sua clínica.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/55"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-bg text-[0.72rem] font-bold tracking-[0.16em] uppercase px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#planos"
              className="border border-bg/20 text-bg/50 text-[0.72rem] font-semibold tracking-[0.16em] uppercase px-10 py-4 hover:border-accent hover:text-bg transition-all duration-300"
            >
              Ver os planos
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
