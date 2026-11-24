# Roteiro para a apresentação (15 min) — não precisa subir no GitHub

## 1. Abertura (1 min)
"Fiz a Receitaria, um catálogo de receitas com React e TypeScript. Ele busca dados de uma API real (TheMealDB), permite filtrar, ver detalhes e favoritar."

## 2. Demonstração (3 min)
Home → Receitas (buscar "chicken", filtrar categoria) → abrir uma receita → favoritar → página Favoritos → recarregar a página (favoritos continuam, por causa do localStorage) → Sobre/Contato → digitar uma rota inválida (404).

## 3. Explicação do código (9 min)
- **`types.ts`**: interfaces `RecipeSummary`, `RecipeDetail`, `Ingredient`. É aqui que mostro o TypeScript.
- **`services/api.ts`**: funções `async` com `fetch`. A função `toDetail` converte `strIngredient1..20` da API em uma lista de ingredientes.
- **`hooks/useFetch.ts`** (custom hook): controla `loading`, `error` e `data`; refaz a busca quando as dependências mudam; usa uma flag `cancelled` para evitar atualizar estado depois que o componente sai da tela.
- **`hooks/useLocalStorage.ts`** (custom hook): igual ao `useState`, mas salva no localStorage com `useEffect`.
- **`context/FavoritesContext.tsx`**: `createContext` + `useContext`. Estado global dos favoritos, com `useCallback` e `useMemo` para não recriar funções/valores à toa.
- **`main.tsx` e `App.tsx`**: `BrowserRouter`, `Routes`, `Route`, rota dinâmica `/receitas/:id`.
- **`SearchBar`**: `useRef` para focar o input e `useState` para o texto (input controlado).
- **`Recipes`**: `useState` (busca e categoria), `useFetch` e `useMemo` para ordenar/filtrar.
- **`RecipeDetails`**: `useParams` pega o `id` da URL.
- **Componentes**: reaproveitamento (`RecipeCard` usado na Home, na lista e nos favoritos), props tipadas com interfaces.

## 4. Fechamento (1 min)
Requisitos: 10 componentes (mín. 8), 6 rotas (mín. 5), 4+ hooks diferentes (useState, useEffect, useContext, useRef, useMemo, useCallback + 2 custom), TypeScript e API real (ponto extra).

## Perguntas que podem cair
- **Por que Context e não props?** Os favoritos são usados no Header (contador), no card e na página Favoritos; Context evita passar props por vários níveis.
- **Por que `useMemo`?** Para só reordenar a lista quando `data` ou `category` mudarem.
- **Para que serve o array de dependências do `useEffect`?** Define quando o efeito roda de novo.
- **O que é um custom hook?** Função que começa com `use` e reaproveita lógica com hooks dentro dela.
