# BioLink PRO - Guia de Instalação Rápida

Este guia fornece instruções passo a passo para instalar e configurar o BioLink PRO em seu ambiente.

## Pré-requisitos

- Node.js 18.0.0 ou superior
- NPM 8.0.0 ou superior

## Instalação Local

1. Descompacte o arquivo zip em um diretório de sua escolha

2. Abra um terminal e navegue até o diretório do projeto:
```bash
cd caminho/para/biolink-pro
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev --name init
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

7. Acesse o sistema em `http://localhost:3000`

## Deploy na Vercel

Para fazer o deploy na Vercel com um clique:

1. Crie uma conta na [Vercel](https://vercel.com) caso ainda não tenha

2. Clique no botão "Deploy to Vercel" no README.md ou acesse o link abaixo:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fseu-usuario%2Fbiolink-pro)

3. Siga as instruções para configurar o projeto

4. Após o deploy, configure as variáveis de ambiente no dashboard da Vercel:
   - `NEXTAUTH_SECRET`: Uma string aleatória para segurança
   - `NEXTAUTH_URL`: A URL do seu site (ex: https://seu-site.vercel.app)
   - `DATABASE_URL`: `file:./prod.db`

## Criando o Primeiro Administrador

1. Registre-se normalmente através da página de registro

2. Acesse o banco de dados SQLite:
```bash
npx prisma studio
```

3. Localize o usuário que deseja tornar administrador
4. Altere o campo `isAdmin` para `true`
5. Salve as alterações

## Suporte

Para suporte, consulte a documentação completa no arquivo README.md ou entre em contato através do e-mail: suporte@biolinkpro.com
