# Pluga Challenge Front

## 📋 Sobre o Projeto

Aplicação web que exibe os apps integrados à [Pluga](https://pluga.co), permitindo aos usuários buscar, visualizar e explorar as ferramentas disponíveis na plataforma. A aplicação oferece:

- 🔍 **Busca em tempo real** por nome de aplicativo
- 📄 **Paginação** para navegação eficiente
- 🎯 **Modal de detalhes** com histórico dos últimos 3 apps acessados
- 🎨 **Interface moderna** com Tailwind CSS e DaisyUI
- ⚡ **Performance otimizada** com Next.js e TanStack Query

## 🔗 Demo

Acesse o projeto em produção: **[https://pluga-challenge-front-swart.vercel.app/](https://pluga-challenge-front-swart.vercel.app/)**

## 🚀 Tecnologias

### Core
- **[Next.js](https://nextjs.org)** 16.0.3 - Framework React com App Router
- **[React](https://react.dev)** 19.2.0 - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org)** 5.x - Tipagem estática

### Styling
- **[Tailwind CSS](https://tailwindcss.com)** v4 - Framework CSS utility-first
- **[DaisyUI](https://daisyui.com)** 5.0.43 - Componentes UI para Tailwind

### State & Data
- **[TanStack Query](https://tanstack.com/query)** 5.90.10 - Server state management
- **[Axios](https://axios-http.com)** 1.13.2 - Cliente HTTP
- **Context API** - State management local

### Testing & Quality
- **[Jest](https://jestjs.io)** - Framework de testes
- **[Testing Library](https://testing-library.com)** - Testes de componentes React
- **[ESLint](https://eslint.org)** - Linter de código

### CI/CD
- **[GitHub Actions](https://github.com/features/actions)** - Pipeline de CI/CD
- **[Vercel](https://vercel.com)** - Deploy automático

## 🏗️ Arquitetura

O projeto segue os princípios do **Atomic Design**:

```
app/
├── components/
│   ├── atoms/         # Componentes básicos (AppIcon, Spinner, etc)
│   ├── molecules/     # Combinações de atoms (SearchInput, AppCard, etc)
│   ├── organisms/     # Componentes complexos (AppsGrid, AppModal)
│   └── templates/     # Layouts de página (AppsTemplate)
├── contexts/          # Context providers (AppsContext)
├── services/          # API services (apps.ts)
├── lib/               # Configurações (api.ts)
├── utils/             # Funções utilitárias testadas
└── types.ts           # TypeScript interfaces
```

## 📦 Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** ou **yarn**

## ⚙️ Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/matheus-carretta/pluga-challenge-front.git
cd pluga-challenge-front
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_BASE_URL=https://pluga.co
```

### 4. Execute o projeto em desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm start            # Inicia servidor de produção
npm run lint         # Executa ESLint
npm test             # Executa testes unitários
npm run test:watch   # Executa testes em modo watch
```

## ✅ CI/CD Pipeline

O projeto possui um workflow automatizado que executa:

1. ✨ **Lint** - Verifica padrões de código com ESLint
2. 🧪 **Testes** - Executa suite de testes unitários
3. 🏗️ **Build** - Valida build de produção

O pipeline roda automaticamente em:
- Push para branches `main` e `challenge`
- Pull Requests para essas branches

## 📝 Funcionalidades Implementadas

- ✅ Migração para Next.js 16 com App Router
- ✅ Migração para TypeScript com tipagem completa
- ✅ Context API para gerenciamento de estado
- ✅ Testes unitários com Jest (17 testes passando)
- ✅ CI/CD com GitHub Actions
- ✅ Atomic Design para organização de componentes
- ✅ Otimização de imagens com Next.js Image
- ✅ LocalStorage para persistência dos últimos apps
- ✅ Design responsivo e moderno

## 👨‍💻 Autor

**Matheus Carretta**

---

Desenvolvido como parte do desafio técnico da [Pluga](https://pluga.co) 🚀
