# BioLink PRO - Roadmap e Estrutura

## Visão Geral do Projeto

BioLink PRO é um micro SaaS 100% funcional e autônomo focado na criação de páginas "link na bio" personalizadas para criadores e profissionais. O sistema permite que usuários criem facilmente uma página centralizada com todos os seus links importantes, personalizem sua aparência e compartilhem com seu público.

## Estrutura de Arquivos

```
biolink-pro/
├── prisma/                # Configuração do Prisma e schema do banco
│   └── schema.prisma      # Definição dos modelos de dados
├── public/                # Arquivos estáticos
├── src/
│   ├── app/               # Rotas e páginas do Next.js
│   │   ├── admin/         # Painel administrativo
│   │   │   └── page.tsx   # Interface de gerenciamento de usuários
│   │   ├── api/           # Rotas da API
│   │   │   ├── admin/     # APIs administrativas
│   │   │   ├── register/  # API de registro
│   │   │   └── auth/      # APIs de autenticação
│   │   ├── dashboard/     # Painel do usuário
│   │   │   └── page.tsx   # Interface de personalização
│   │   ├── login/         # Página de login
│   │   │   └── page.tsx   # Formulário de login
│   │   ├── register/      # Página de registro
│   │   │   └── page.tsx   # Formulário de registro
│   │   ├── u/             # Páginas públicas dos usuários
│   │   │   └── [username]/# Rota dinâmica para perfil público
│   │   └── page.tsx       # Landing page institucional
│   ├── components/        # Componentes reutilizáveis
│   │   └── ui/            # Componentes de interface
│   ├── lib/               # Utilitários e configurações
│   │   ├── auth.ts        # Configuração do NextAuth
│   │   ├── db.ts          # Configuração do Prisma
│   │   └── session.ts     # Utilitários de sessão
│   └── middleware.ts      # Middleware para proteção de rotas
├── .env                   # Variáveis de ambiente
├── next.config.ts         # Configuração do Next.js
├── package.json           # Dependências e scripts
├── tailwind.config.js     # Configuração do TailwindCSS
└── vercel.json            # Configuração para deploy na Vercel
```

## Rotas do Sistema

### Públicas
- `/`: Landing page institucional
- `/login`: Página de login
- `/register`: Página de registro
- `/u/[username]`: Página pública do usuário

### Protegidas (Requer Autenticação)
- `/dashboard`: Painel do usuário
- `/api/profile`: API para gerenciamento de perfil
- `/api/links`: API para gerenciamento de links

### Administrativas (Requer Permissão de Admin)
- `/admin`: Painel administrativo
- `/api/admin/users`: API para gerenciamento de usuários
- `/api/admin/users/[userId]/toggle-status`: API para ativar/desativar usuários

## Regras de Permissão

### Usuário Não Autenticado
- Pode acessar a landing page, login, registro e páginas públicas de usuários
- Não pode acessar o painel do usuário ou administrativo
- É redirecionado para a página de login ao tentar acessar rotas protegidas

### Usuário Autenticado
- Pode acessar seu painel de usuário e gerenciar seu perfil
- Pode criar e editar seus links e redes sociais
- Pode visualizar sua página pública
- Não pode acessar o painel administrativo
- É redirecionado para o dashboard ao tentar acessar login/registro

### Administrador
- Possui todas as permissões de usuário autenticado
- Pode acessar o painel administrativo
- Pode visualizar todos os usuários cadastrados
- Pode ativar/desativar contas de usuários
- Pode visualizar estatísticas gerais do sistema

## Modelos de Dados

### User
- id: Identificador único
- name: Nome do usuário
- email: E-mail único
- password: Senha criptografada
- image: URL da imagem de perfil
- description: Descrição pessoal
- isActive: Status de ativação
- isAdmin: Flag de administrador
- theme: Tema visual escolhido
- links: Relação com os links
- socialLinks: Relação com as redes sociais

### Link
- id: Identificador único
- title: Título do link
- url: URL do link
- order: Ordem de exibição
- userId: Relação com o usuário

### SocialLink
- id: Identificador único
- platform: Plataforma da rede social
- url: URL do perfil
- order: Ordem de exibição
- userId: Relação com o usuário

## Fluxo de Autenticação

1. Registro:
   - Usuário preenche formulário com nome, e-mail e senha
   - Sistema valida os dados e cria novo usuário
   - Senha é criptografada com bcrypt antes de ser armazenada

2. Login:
   - Usuário fornece e-mail e senha
   - Sistema valida credenciais e cria sessão JWT
   - Token é armazenado em cookie seguro

3. Proteção de Rotas:
   - Middleware verifica token JWT em cada requisição
   - Redireciona para login se não autenticado em rotas protegidas
   - Verifica permissão de admin para rotas administrativas

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: NextAuth.js
- **Deploy**: Vercel

## Próximos Passos

1. Implementar análise de cliques nos links
2. Adicionar mais opções de temas visuais
3. Implementar upload de imagens para perfil
4. Adicionar suporte a domínios personalizados
5. Implementar sistema de pagamentos para planos premium
