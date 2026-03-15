# Beleza Academy - Plataforma de Cursos Online

Uma plataforma moderna e elegante de cursos online focada na área de estética, desenvolvida com Next.js e integrada ao CMS headless Strapi.

![Design Premium](https://img.shields.io/badge/Design-Premium-gold)
![Next.js](https://img.shields.io/badge/Next.js-16+-black)
![Strapi](https://img.shields.io/badge/Strapi-CMS_Headless-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Características

### Página Pública
- **Landing Page Premium** - Design elegante em branco e dourado com hero section impactante
- **Seção de Benefícios** - Apresentação dos diferenciais da plataforma
- **Destaque de Cursos** - Catálogo visual dos principais cursos disponíveis
- **Design Responsivo** - Totalmente otimizado para desktop e mobile

### Área do Aluno (Dashboard)
- **Autenticação Segura** - Sistema de login e cadastro
- **Dashboard Intuitivo** - Visualização clara de todos os cursos disponíveis
- **Player de Vídeo** - Reprodutor integrado para aulas (YouTube/Vimeo)
- **Navegação de Aulas** - Lista lateral com módulos e aulas organizadas
- **Marcação de Progresso** - Rastreamento de aulas assistidas
- **Materiais Complementares** - Download de PDFs e recursos adicionais

### Gerenciamento de Conteúdo (Strapi)
- **Cursos** - Criação e gerenciamento de cursos completos
- **Módulos** - Organização hierárquica do conteúdo
- **Aulas** - Estrutura de vídeos e recursos por aula
- **Uploads** - Suporte para vídeos e materiais complementares
- **Interface Amigável** - Painel intuitivo para usuários não técnicos

## 🚀 Tecnologias

- **Frontend**: Next.js 16+ com App Router
- **Styling**: Tailwind CSS v4 com design system customizado
- **CMS**: Strapi (Headless CMS)
- **Autenticação**: JWT com armazenamento seguro
- **Data Fetching**: SWR para cache e revalidação
- **Fontes**: Playfair Display (headings) + Inter (body)
- **TypeScript**: Type safety completo

## 📋 Requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- Strapi 4.0+
- Navegador moderno

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/beleza-academy.git
cd beleza-academy
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_aqui
```

### 4. Configure o Strapi

Para instruções detalhadas sobre como configurar o Strapi, consulte [STRAPI_SETUP.md](./STRAPI_SETUP.md).

### 5. Inicie o servidor de desenvolvimento

```bash
pnpm dev
# ou
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
beleza-academy/
├── app/
│   ├── layout.tsx                 # Layout raiz com tema
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Estilos globais e design tokens
│   ├── login/
│   │   └── page.tsx               # Página de login
│   ├── cadastro/
│   │   └── page.tsx               # Página de cadastro
│   └── dashboard/
│       ├── layout.tsx             # Layout do dashboard
│       ├── page.tsx               # Dashboard inicial
│       ├── cursos/
│       │   ├── page.tsx           # Lista de cursos
│       │   └── [slug]/
│       │       └── page.tsx       # Detalhe do curso com player
│
├── components/
│   ├── public-header.tsx          # Header da landing page
│   ├── hero-section.tsx           # Seção hero
│   ├── benefits-section.tsx       # Seção de benefícios
│   ├── courses-section.tsx        # Seção de cursos
│   ├── cta-section.tsx            # Call-to-action
│   ├── footer.tsx                 # Footer
│   └── dashboard/
│       ├── header.tsx             # Header do dashboard
│       ├── sidebar.tsx            # Sidebar de navegação
│       ├── course-card.tsx        # Card de curso
│       ├── video-player.tsx       # Player de vídeo
│       └── lesson-list.tsx        # Lista de aulas
│
├── contexts/
│   └── auth-context.tsx           # Contexto de autenticação
│
├── hooks/
│   ├── use-courses.ts             # Hook para buscar cursos
│   └── use-progress.ts            # Hook para gerenciar progresso
│
├── lib/
│   ├── strapi.ts                  # Cliente Strapi
│   └── utils.ts                   # Utilitários (cn, etc)
│
├── types/
│   └── index.ts                   # Types TypeScript
│
├── public/
│   └── [assets]                   # Imagens e ícones
│
├── .env.example                   # Variáveis de ambiente modelo
├── STRAPI_SETUP.md                # Documentação de setup do Strapi
├── README.md                       # Este arquivo
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 🎨 Design System

### Cores Principal
- **Primária**: Dourado (`#c9a962` / `oklch(0.72 0.12 85)`)
- **Secundária**: Branco (`#ffffff` / `oklch(0.99 0.002 90)`)
- **Texto**: Charcoal (`#333333` / `oklch(0.20 0.01 60)`)

### Tipografia
- **Headings**: Playfair Display (elegante e premium)
- **Body**: Inter (legível e moderna)

### Espaçamento
Usa escala de espaçamento do Tailwind CSS (4px, 8px, 12px, 16px, etc)

## 🔐 Autenticação

### Login

```bash
POST /api/auth/login
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

### Cadastro

```bash
POST /api/auth/register
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "password": "senha_segura"
}
```

Os tokens JWT são armazenados de forma segura e automaticamente incluídos nas requisições.

## 📚 Integrando com Strapi

### 1. Estrutura de Conteúdo

O Strapi deve ter os seguintes content types:

**Curso**
- `titulo` (string)
- `descricao` (text)
- `imagem` (media)
- `modulos` (relation)

**Módulo**
- `titulo` (string)
- `descricao` (text)
- `ordem` (number)
- `aulas` (relation)
- `curso` (relation)

**Aula**
- `titulo` (string)
- `descricao` (text)
- `duracao` (number)
- `video_url` (string)
- `materiais` (media)
- `modulo` (relation)

### 2. Configurar Permissões

Habilite acesso público (sem autenticação) para listar cursos na landing page.

### 3. Buscar Dados

```typescript
import { fetchCourses, fetchCourseBySlug } from '@/lib/strapi'

// Listar todos os cursos
const courses = await fetchCourses()

// Buscar um curso específico
const course = await fetchCourseBySlug('estética-facial')
```

## 🚀 Deployment

### Vercel (Recomendado)

1. Push seu código para um repositório GitHub
2. Conecte no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático

```bash
vercel deploy
```

### Variáveis de Ambiente em Produção

```env
NEXT_PUBLIC_STRAPI_URL=https://seu-strapi-producao.com
STRAPI_API_TOKEN=seu_token_seguro
```

## 📖 Documentação Adicional

- [Setup do Strapi](./STRAPI_SETUP.md) - Configuração detalhada do CMS
- [Troubleshooting](#troubleshooting) - Resolução de problemas

## 🐛 Troubleshooting

### Erro: "Strapi não conectado"

1. Verifique se `NEXT_PUBLIC_STRAPI_URL` está correto
2. Confirme que o Strapi está rodando
3. Teste a conexão: `curl http://localhost:1337/api`

### Erro: "Token expirado"

O token JWT é renovado automaticamente ao fazer login novamente.

### Dados mock não aparecem

Verifique se você configurou as variáveis de ambiente. Sem elas, o app usa dados mock para demonstração.

## 💡 Próximas Melhorias

- [ ] Sistema de comentários em aulas
- [ ] Certificados de conclusão
- [ ] Quiz e avaliações
- [ ] Filtro por dificuldade
- [ ] Recomendações personalizadas
- [ ] Integração de pagamento (Stripe)
- [ ] Notificações por email
- [ ] App mobile nativa

## 📝 Licença

Este projeto está licenciado sob a MIT License - consulte o arquivo LICENSE para detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para alterações maiores, abra uma issue primeiro para discutir o que você gostaria de mudar.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

- **Email**: contato@belezaacademy.com
- **Website**: https://www.belezaacademy.com
- **Instagram**: @belezaacademy

---

Desenvolvido com ❤️ para profissionais de estética
