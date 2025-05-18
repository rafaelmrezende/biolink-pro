# BioLink PRO

BioLink PRO é uma solução completa para criação de páginas "link na bio" personalizadas para criadores e profissionais. Com uma interface moderna e intuitiva, o sistema permite que usuários criem facilmente uma página centralizada com todos os seus links importantes.

## Características Principais

- **Autenticação Segura**: Sistema de login/registro com e-mail e senha
- **Painel Personalizável**: Edição de perfil, links, redes sociais e temas visuais
- **Página Pública Responsiva**: Layout adaptável para qualquer dispositivo
- **Painel Administrativo**: Gerenciamento de usuários e estatísticas 
- **Design Moderno**: Interface elegante com TailwindCSS e componentes shadcn/ui
- **Deploy Simplificado**: Configuração pronta para deploy na Vercel

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: NextAuth.js
- **Deploy**: Vercel

## Requisitos

- Node.js 18.0.0 ou superior
- NPM 8.0.0 ou superior

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/rafaelmrezende/biolink-pro.git
cd biolink-pro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse o sistema em `http://localhost:3000`

## Estrutura do Projeto

```
biolink-pro/
├── prisma/                # Configuração do Prisma e schema do banco
├── public/                # Arquivos estáticos
├── src/
│   ├── app/               # Rotas e páginas do Next.js
│   │   ├── admin/         # Painel administrativo
│   │   ├── api/           # Rotas da API
│   │   ├── dashboard/     # Painel do usuário
│   │   ├── login/         # Página de login
│   │   ├── register/      # Página de registro
│   │   └── u/             # Páginas públicas dos usuários
│   ├── components/        # Componentes reutilizáveis
│   ├── lib/               # Utilitários e configurações
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

## Deploy na Vercel

Para fazer o deploy do BioLink PRO na Vercel, siga os passos abaixo:

1. Crie uma conta na [Vercel](https://vercel.com) caso ainda não tenha
2. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

3. Faça login na sua conta:
```bash
vercel login
```

4. No diretório do projeto, execute:
```bash
vercel
```

5. Siga as instruções para configurar o projeto
6. Após o deploy, configure as variáveis de ambiente no dashboard da Vercel:
   - `NEXTAUTH_SECRET`: Uma string aleatória para segurança
   - `NEXTAUTH_URL`: A URL do seu site (ex: https://seu-site.vercel.app)
   - `DATABASE_URL`: `file:./prod.db`

Alternativamente, você pode usar o botão "Deploy to Vercel" abaixo:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frafaelmrezende%2Fbiolink-pro)

## Criando o Primeiro Usuário Administrador

Para criar o primeiro usuário administrador, siga os passos:

1. Registre-se normalmente através da página de registro
2. Acesse o banco de dados SQLite:
```bash
npx prisma studio
```

3. Localize o usuário que deseja tornar administrador
4. Altere o campo `isAdmin` para `true`
5. Salve as alterações

## Personalização

Você pode personalizar o BioLink PRO de várias formas:

- **Temas**: Adicione novos temas visuais em `src/app/dashboard/page.tsx`
- **Redes Sociais**: Adicione suporte a mais plataformas em `src/app/dashboard/page.tsx`
- **Estilos**: Modifique o arquivo `tailwind.config.js` para alterar cores e estilos

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Suporte

Para suporte, entre em contato através do e-mail: suporte@biolinkpro.com
