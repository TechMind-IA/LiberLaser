'use client'

import { useState } from 'react'
import PublicHeader from '@/components/public-header'
import Footer from '@/components/footer'
import Image from 'next/image'

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
  { num: '01', title: 'Formação em depilação',   desc: 'Capacitação teórica e prática para atender com segurança e confiança no primeiro atendimento.' },
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

function PlanAccordion({ plano, defaultOpen = false }: { plano: typeof planos[0], defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`${plano.destaque ? 'border-l-2 border-l-accent' : ''}`}>

      {/* Header clicável */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-200 ${
          plano.destaque ? 'bg-accent/5 hover:bg-accent/10' : 'bg-bg hover:bg-surface'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="min-w-0">
            <span className="block text-accent text-[0.58rem] font-bold tracking-[0.2em] uppercase mb-0.5">
              {plano.periodo}
            </span>
            <span className="font-serif text-primary text-base sm:text-lg font-semibold">
              {plano.nome}
              {'badge' in plano && plano.badge && (
                <span className="ml-2 bg-accent text-bg text-[0.5rem] font-bold tracking-[0.14em] uppercase px-2 py-0.5 align-middle">
                  {plano.badge}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          <div className="text-right">
            <span className="block font-serif text-accent text-xl sm:text-2xl font-semibold leading-none">
              {plano.preco6h}
            </span>
            <span className="block text-[0.68rem] font-medium text-secondary/60 mt-1">
              ou {plano.preco12h} / 12h
            </span>
          </div>
          <span
            className="text-accent/50 text-xs transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Body expansível */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '500px' : '0px' }}
      >
        <div className={`px-5 sm:px-6 pt-4 pb-5 border-t border-accent/10 ${plano.destaque ? 'bg-accent/[0.03]' : 'bg-bg'}`}>
          <ul className="flex flex-col gap-2.5 mb-4">
            {plano.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-2.5 text-sm leading-snug ${
                  plano.extras.includes(f) ? 'text-accent font-semibold' : 'text-secondary'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    plano.extras.includes(f) ? 'bg-accent' : 'border border-accent/40'
                  }`}
                />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-[0.58rem] font-bold tracking-[0.14em] uppercase text-secondary/40">
            {plano.prioridade}
          </p>
        </div>
      </div>

    </div>
  )
}

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
        className="min-h-screen bg-bg flex items-center px-6 sm:px-10 lg:px-16"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center py-16">

          {/* Texto */}
          <div>
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
                className="border border-(--color-border) text-secondary text-[0.72rem] font-semibold tracking-[0.16em] uppercase px-8 py-4 hover:border-accent hover:text-primary transition-all duration-300"
              >
                Entre em contato
              </a>
            </div>
          </div>

          {/* Vídeo */}
          <div className="relative" style={{ paddingBottom: '2rem' }}>

            {/* Frame traseiro */}
            <div className="absolute pointer-events-none" style={{ top: -12, left: -12, right: -12, bottom: 24, border: '1px solid rgba(196,137,106,0.35)', zIndex: 0 }} />

            {/* Cantos em L — dourados */}
            <div className="absolute" style={{ top: -12, left: -12, width: 24, height: 24, borderTop: '2px solid #C4896A', borderLeft: '2px solid #C4896A', zIndex: 2 }} />
            <div className="absolute" style={{ top: -12, right: -12, width: 24, height: 24, borderTop: '2px solid #C4896A', borderRight: '2px solid #C4896A', zIndex: 2 }} />
            <div className="absolute" style={{ bottom: 24, left: -12, width: 24, height: 24, borderBottom: '2px solid #C4896A', borderLeft: '2px solid #C4896A', zIndex: 2 }} />
            <div className="absolute" style={{ bottom: 24, right: -12, width: 24, height: 24, borderBottom: '2px solid #C4896A', borderRight: '2px solid #C4896A', zIndex: 2 }} />

            {/* Vídeo sem player */}
            <div className="relative z-10">
              <video
                src="/video1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full block bg-surface"
              />
            </div>

            <p className="mt-4 text-center text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-accent">
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
      <section id="sobre" className="bg-bg py-6 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-24 items-center">

          {/* Decorativo */}
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <Image
              src="/fundadora.jpg"
              alt="Fundadora da Liber Laser Academy"
              fill
              className="object-cover object-center"
            />
            {/* Cantos decorativos */}
            <div className="absolute bottom-6 right-6 w-px h-20 bg-accent/40 z-10" />
            <div className="absolute top-6 left-6 w-20 h-px bg-accent/40 z-10" />
          </div>

          {/* Texto */}
          <div className='py-0'>
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-5">
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
            <p className="text-secondary text-base leading-relaxed mb-4">
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
      <section id="servicos" className="bg-surface py-8 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-7">
            <div className='mb-0'>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--color-border)">
            {[
              {
                num: '01',
                title: 'Depilação a laser',
                desc: 'Tratamento recorrente, agenda cheia e faturamento previsível. A tecnologia 808 nm permite sessões rápidas e seguras, criando pacotes que fidelizam clientes e garantem receita constante.',
                tags: ['Alta recorrência', '808 nm', 'Agenda cheia'],
              },
              {
                num: '02',
                title: 'Clareamento a laser',
                desc: 'Alto valor percebido com baixo custo operacional. Um procedimento complementar que aumenta o ticket médio, potencializa resultados e diferencia sua clínica com tecnologia avançada.',
                tags: ['Alto ticket', 'Diferencial', 'Premium'],
              },
            ].map((s) => (
              <div
                key={s.num}
                className="bg-bg p-6 sm:p-8 hover:bg-surface transition-colors duration-300 group"
              >
                {/* Número decorativo */}
                <p className="font-serif text-accent/30 text-5xl sm:text-6xl font-semibold leading-none mb-6 select-none">
                  {s.num}
                </p>

                <h3 className="font-serif text-primary text-xl sm:text-2xl font-semibold mb-3">
                  {s.title}
                </h3>

                <p className="text-secondary text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-accent text-[0.58rem] font-bold tracking-[0.16em] uppercase border border-accent/30 px-2.5 py-1 group-hover:border-accent/60 transition-colors duration-300"
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
      <section id="diferenciais" className="bg-bg py-8 sm:py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 lg:gap-16 lg:items-start">

          {/* Texto intro */}
          <div className="mb-7 sm:mb-12 lg:mb-0">
            <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-5 sm:mb-7">
              <span className="w-6 h-px bg-accent shrink-0" />
              Diferenciais
            </p>
            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl mb-5 sm:mb-6">
              Mais do que<br />
              uma <em className="text-accent not-italic">máquina.</em>
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Na Liber, você recebe um sistema completo para transformar a
              tecnologia em faturamento consistente.
            </p>
          </div>

          {/* Grid de itens */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px">
            {diferenciais.map((item) => (
              <div
                key={item.num}
                className="bg-bg p-2 sm:p-8 hover:bg-surface transition-colors duration-300"
              >
                <h4 className="text-primary font-semibold text-sm sm:text-base mb-2">
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
      <section className="bg-surface py-16 sm:py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="flex items-center justify-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-5">
              <span className="w-5 h-px bg-accent shrink-0" />
              Para quem é?
              <span />
            </p>
            <h2 className="font-serif text-primary font-semibold leading-tight text-3xl sm:text-4xl lg:text-5xl">
              A Liber foi criada<br />
              para <em className="text-accent not-italic">você</em> que...
            </h2>
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-px bg-accent/15 max-w-4xl mx-auto">
            {paraQuem.map((text, i) => (
              <div
                key={i}
                className="bg-surface hover:bg-bg transition-colors duration-200 group flex items-start gap-4 sm:gap-5 px-5 sm:px-7 py-4 sm:py-5"
              >
                {/* Número */}
                <span className="font-serif text-accent/40 text-[0.72rem] font-semibold tracking-[0.08em] min-w-[24px] pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Linha divisória vertical */}
                <span className="w-px self-stretch bg-accent/20 shrink-0" />

                {/* Texto */}
                <p className="text-secondary text-sm sm:text-base leading-relaxed flex-1">
                  {text}
                </p>

                {/* Seta */}
                <span className="text-accent/30 group-hover:text-accent transition-colors duration-200 shrink-0 pt-0.5 text-base">
                  →
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PLANOS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="planos" className="bg-bg py-10 sm:py-24 lg:py-36 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-10 sm:mb-14">
            <div>
              <p className="flex items-center gap-3 text-accent text-[0.7rem] font-semibold tracking-[0.28em] uppercase mb-5 sm:mb-7">
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

          {/* Info box */}
          <div className="border border-accent/20 px-4 py-3 sm:px-5 sm:py-4 mb-6 flex items-start gap-3">
            <span className="text-accent text-[0.65rem] shrink-0 mt-0.5">◆</span>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
              Toque em cada plano para ver o que está incluído. Quanto maior o período, menor o valor mensal e maior a prioridade de agendamento.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-px bg-accent/15 mb-8">
            {planos.map((p, index) => (
              <PlanAccordion key={p.nome} plano={p} defaultOpen={p.destaque} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href="https://wa.me/55"
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
          CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-primary py-10 lg:py-44 px-6 sm:px-10 lg:px-16 text-center relative overflow-hidden">

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
              Falar com o Especialista
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
