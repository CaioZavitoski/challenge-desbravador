<p align="center">
  <img src="docs/desbravador.png" alt="Desbravador Software" width="170">
</p>

# Challenge Frontend Desbravador

Aplicação que consome a API do GitHub e mostra os repositórios mais
populares de um user. Feito em JavaScript puro.

## Conteúdo

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)

## Funcionalidades

- Buscar um user do GitHub.
- Ver os detalhes do user: avatar, nome, bio, e-mail, seguidores e seguindo.
- Listar os repos do user ordenados por número de estrelas
  (decrescente por padrão).
- Alterar a ordenação da lista e filtrar os repos pelo nome.
- Ver a página de detalhes de um repo, com link externo para o GitHub.
- Layout responsivo com Bootstrap.

## Tecnologias

- JavaScript
- Axios
- Bootstrap 5 e Bootstrap Icons
- Rotas client-side

## Como executar

### Pré-requisitos

- Baixe e instale o [Node.js](https://nodejs.org).

### Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/CaioZavitoski/challenge-desbravador.git
   cd challenge-desbravador
   ```

2. Inicie o servidor:

   ```sh
   npm start
   ```

Isso inicia o projeto em [http://localhost:5173](http://localhost:5173).

## Estrutura do projeto

```
js/
│
├── api/                  # Uma função por endpoint da API
│   ├── get-user.js
│   ├── get-repos.js
│   └── get-repo.js
│
├── components/           # UI
│   ├── header.js
│   ├── message.js
│   └── spinner.js
│
├── lib/                  # Configs e utils
│   ├── api-error.js
│   ├── axios.js
│   ├── format.js
│   └── html.js
│
├── pages/
│   ├── _layouts/
│   │   └── app.js
│   ├── user/
│   │   ├── user.js
│   │   ├── filters.js
│   │   ├── repos-table.js
│   │   └── user-profile.js
│   ├── repo/
│   │   └── repo.js
│   ├── home.js
│   └── not-found.js
│
├── router.js
├── routes.js
└── main.js
```
