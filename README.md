# Repositório de Filmes

Aplicação Web para explorar um catálogo de filmes, com informação como o título,
ano de estreia, géneros, cartaz, sinopse, classificação e elenco. A interface
permite percorrer os filmes através de uma lista paginada e consultar uma página
com os detalhes de cada título.

O projeto foi desenvolvido como uma aplicação de cliente-servidor: a interface
foi criada em React.js, enquanto o servidor disponibiliza uma API que obtém os
dados dos filmes a partir de uma base de dados MongoDB. A aplicação está
configurada para alojamento no Vercel.

## Funcionalidades

- Listagem de filmes com título, ano, cartaz e géneros.
- Paginação da lista, com 10 filmes por página.
- Página de detalhes com sinopse, géneros, classificação e número de votos no IMDb, elenco e cartaz.
- API REST para consultar os filmes guardados no MongoDB.

## Tecnologias

- **Interface:** React.js 
- **Servidor:** Node.js, Express e Mongoose.
- **Base de dados:** MongoDB.
- **Alojamento:** Vercel.

## Publicação no Vercel

O ficheiro `vercel.json` configura os serviços da interface e do servidor e
encaminha os pedidos entre ambos. Para publicar o projeto:

1. Importa este repositório no Vercel.
2. Nas definições do projeto no Vercel, configura a variável de ambiente
   `MONGO_URI` com o endereço de ligação à base de dados MongoDB.
3. Confirma que a base de dados aceita ligações a partir do servidor publicado.
4. Publica o projeto. O Vercel disponibiliza o endereço público da aplicação
   no painel do projeto.

A interface acede à API através do caminho `/api`, no mesmo domínio da
aplicação. As regras em `vercel.json` encaminham esses pedidos para o serviço
do servidor.

## API

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/movies?page=1&limit=10` | Devolve uma página de filmes, ordenada do ano mais recente para o mais antigo. |
| `GET` | `/api/movies/:id` | Devolve os detalhes de um filme através do respetivo identificador MongoDB. |

O endpoint da listagem devolve os campos `data`, `totalPages`, `currentPage` e
`totalMovies`. O endpoint dos detalhes devolve os dados do filme ou o estado
`404` se não existir nenhum filme com esse identificador.

## Estrutura

```text
backend/
  movieController.js  # Consultas e lógica dos endpoints
  movieModel.js       # Modelo Mongoose dos filmes
  movieRoutes.js      # Rotas da API
  server.js           # Configuração do servidor
frontend/
  src/
    components/       # Barra de navegação e cartão de filme
    pages/            # Lista e páginas de detalhes
vercel.json           # Configuração dos serviços e encaminhamento no Vercel
```
