# 🍳 Receitaria — Catálogo de Receitas

Trabalho final de **Front-end Frameworks** (AV2) — Análise e Desenvolvimento de Sistemas.

Aplicação web feita com **React + TypeScript (Vite)** para pesquisar receitas, ver ingredientes e modo de preparo e salvar favoritas. Os dados vêm da API pública [TheMealDB](https://www.themealdb.com/api.php) (integração com API real).

## 👩‍💻 Integrante

| Aluna | Componentes desenvolvidos |
| --- | --- |
| Larissa Viana Pereira | Todos (10 componentes funcionais, listados abaixo) |

## 🚀 Como instalar e usar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

Para gerar a versão de produção: `npm run build`.

## 📄 Páginas (6 rotas)

| Rota | Página | O que faz |
| --- | --- | --- |
| `/` | Home | Apresentação e receita aleatória sugerida |
| `/receitas` | Receitas | Busca por nome e filtro por categoria |
| `/receitas/:id` | Detalhes | Ingredientes, preparo e vídeo da receita |
| `/favoritos` | Favoritos | Receitas salvas pelo usuário |
| `/sobre` | Sobre | Descrição do projeto e formulário de contato |
| `*` | 404 | Página não encontrada |

## 🧩 Componentes funcionais (10)

`Header`, `Footer`, `SearchBar`, `CategoryFilter`, `RecipeCard`, `RecipeList`, `FavoriteButton`, `IngredientList`, `Loading`, `ErrorMessage` (em `src/components`).

## 🪝 Hooks utilizados

| Hook | Onde é usado |
| --- | --- |
| `useState` | SearchBar, Recipes, Home, About |
| `useEffect` | useFetch, useLocalStorage, SearchBar |
| `useContext` | `useFavorites` (FavoritesContext) |
| `useRef` | SearchBar (foco no campo de busca) |
| `useMemo` | Recipes (ordenação/filtro) e FavoritesContext |
| `useCallback` | FavoritesContext |
| **Custom** `useFetch` | Busca na API com loading e erro |
| **Custom** `useLocalStorage` | Persistência dos favoritos |
| `useParams` (React Router) | RecipeDetails |

## 🗂 Estrutura

```
src/
├── components/   # componentes reutilizáveis
├── context/      # FavoritesContext (estado global)
├── hooks/        # useFetch, useLocalStorage
├── pages/        # páginas ligadas às rotas
├── services/     # api.ts (chamadas à TheMealDB)
├── types.ts      # interfaces TypeScript
├── App.tsx       # rotas
└── main.tsx      # ponto de entrada
```

## 🖼 Prints das telas

Adicione aqui os prints (crie a pasta `prints/` e coloque as imagens):

- Home: `![Home](prints/home.png)`
- Receitas: `![Receitas](prints/receitas.png)`
- Detalhes: `![Detalhes](prints/detalhes.png)`
- Favoritos: `![Favoritos](prints/favoritos.png)`

## 🌐 Deploy (opcional)

Pode ser feito na Vercel ou Netlify: importe o repositório do GitHub, comando de build `npm run build`, pasta de saída `dist`. Em SPAs com rotas, configure o redirecionamento de todas as rotas para `index.html`.

## ℹ️ Observação

As receitas (nomes, ingredientes e preparo) vêm em inglês, pois é o idioma da API TheMealDB. A interface do sistema está em português.
