# Guia de Configuração do Strapi

Este guia explica como configurar o Strapi CMS para funcionar com a plataforma Beleza Academy.

## 1. Instalação do Strapi

```bash
npx create-strapi@latest beleza-academy-cms
cd beleza-academy-cms
npm run develop
```

## 2. Estrutura de Content Types

Crie os seguintes Content Types no painel admin do Strapi:

### Course (Curso)
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| title | Text | Sim |
| slug | UID (baseado em title) | Sim |
| description | Rich Text | Sim |
| thumbnail | Media (Single) | Sim |
| duration | Text | Sim |
| level | Enumeration (iniciante, intermediario, avancado) | Sim |
| instructor | Text | Sim |
| modules | Relation (has many Module) | Não |

### Module (Módulo)
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| title | Text | Sim |
| description | Text | Não |
| order | Number | Sim |
| course | Relation (belongs to Course) | Sim |
| lessons | Relation (has many Lesson) | Não |

### Lesson (Aula)
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| title | Text | Sim |
| description | Text | Não |
| videoUrl | Text | Sim |
| duration | Text | Sim |
| order | Number | Sim |
| module | Relation (belongs to Module) | Sim |
| materials | Relation (has many Material) | Não |

### Material (Material Complementar)
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| name | Text | Sim |
| file | Media (Single) | Sim |
| lesson | Relation (belongs to Lesson) | Sim |

## 3. Configuração de Permissões

No painel do Strapi, vá em **Settings > Users & Permissions > Roles > Public**:

1. Habilite as seguintes permissões para **Course**:
   - find
   - findOne

2. Para **Module**, **Lesson** e **Material**:
   - find
   - findOne

## 4. Configuração da API Token

1. Vá em **Settings > API Tokens**
2. Crie um novo token com permissão **Read-only**
3. Copie o token gerado

## 5. Variáveis de Ambiente

Configure as seguintes variáveis no seu projeto Next.js:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu_token_aqui
```

## 6. Endpoints da API

A aplicação utiliza os seguintes endpoints:

- `GET /api/courses` - Lista todos os cursos
- `GET /api/courses?filters[slug][$eq]={slug}` - Busca curso por slug
- `GET /api/lessons/{id}` - Detalhes de uma aula
- `POST /api/auth/local` - Login
- `POST /api/auth/local/register` - Cadastro

## 7. Populando Dados

Para popular relações, use o parâmetro `populate`:

```
/api/courses?populate[thumbnail]=*&populate[modules][populate][lessons]=*
```

## 8. Autenticação de Usuários

O Strapi já possui sistema de autenticação integrado. Para ativar:

1. Vá em **Settings > Users & Permissions > Advanced Settings**
2. Configure as opções de registro e confirmação de email
3. Os usuários serão armazenados na collection **Users**

## 9. Upload de Vídeos

Para vídeos, recomendamos:

1. **Opção 1**: Use um serviço externo (YouTube, Vimeo) e armazene apenas a URL
2. **Opção 2**: Configure o upload direto no Strapi (para vídeos pequenos)
3. **Opção 3**: Use um serviço de streaming (Cloudflare Stream, Mux)

## 10. Deploy

### Strapi Cloud
```bash
npm run strapi deploy
```

### Heroku
```bash
heroku create
git push heroku main
```

### Railway / Render
Siga as instruções na documentação oficial do Strapi.

---

## Suporte

Para mais informações, consulte a [documentação oficial do Strapi](https://docs.strapi.io/).
