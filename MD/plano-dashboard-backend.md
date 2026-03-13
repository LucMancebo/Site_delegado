# Plano de Implementacao - Dashboard de Apoios (Node.js)

## 1. Objetivo
Criar um backend em Node.js para armazenar os dados enviados no formulario e alimentar um dashboard administrativo com:

- Aba `Todos`
- Aba por `Estado`
- Aba por `Cidade`
- Aba `Grafico de Apoios` com os mesmos filtros (`Todos`, `Estado`, `Cidade`)

Regra principal:
- Cada mensagem enviada no formulario conta como 1 apoio.

---

## 2. Arquitetura Recomendada

## Frontend atual
- Site publico (formulario) envia os dados para API.

## Backend
- API REST em Node.js para receber, validar e salvar apoios.

## Banco de dados
- PostgreSQL para persistencia dos dados.

## Dashboard admin
- Pode ser uma pagina separada (ex: `/admin`) consumindo a API.

Fluxo:
1. Usuario envia formulario.
2. Backend valida campos obrigatorios.
3. Backend cria 1 registro de apoio.
4. Dashboard consulta agregacoes (total, por estado, por cidade).
5. Aba de grafico usa os mesmos filtros da listagem.

---

## 3. Stack Tecnologica (Backend)

Stack minima:
- Node.js 20+
- Fastify (ou Express)
- PostgreSQL
- Prisma ORM
- Zod (validacao)
- CORS
- dotenv

Stack recomendada para producao:
- JWT para autenticacao do dashboard admin
- bcrypt para hash de senha de admin
- Redis (cache para consultas agregadas)
- pino (logs)
- Docker + Docker Compose

---

## 4. Modelo de Dados

Observacao: Para facilitar filtros e agregacoes, usar estrutura normalizada de localizacao.

## Tabelas

### `states`
- `id` (PK)
- `name` (ex: "Rio de Janeiro")
- `uf` (ex: "RJ")
- `created_at`

### `cities`
- `id` (PK)
- `state_id` (FK -> states.id)
- `name` (ex: "Niteroi")
- `created_at`

### `districts` (bairros)
- `id` (PK)
- `city_id` (FK -> cities.id)
- `name` (ex: "Icarai")
- `created_at`

### `supports` (apoios)
- `id` (PK)
- `full_name`
- `email`
- `message`
- `state_id` (FK)
- `city_id` (FK)
- `district_id` (FK, opcional no inicio)
- `source` (ex: "site")
- `created_at`

Regra de negocio:
- 1 linha em `supports` = 1 apoio.

---

## 5. Endpoints da API

Prefixo sugerido: `/api`

## Apoios

### `POST /api/supports`
Recebe formulario publico.

Body:
```json
{
  "fullName": "Maria Santos",
  "email": "maria@email.com",
  "state": "Rio de Janeiro",
  "city": "Niteroi",
  "district": "Icarai",
  "message": "Apoio a proposta de seguranca"
}
```

Comportamento:
- Valida campos
- Resolve `state/city/district` (ou cria se necessario, de acordo com regra definida)
- Cria 1 registro em `supports`
- Retorna 201

### `GET /api/supports`
Lista apoios para o dashboard.

Query params:
- `tab=all|state|city`
- `stateId` (opcional)
- `cityId` (opcional)
- `page`
- `pageSize`
- `startDate` / `endDate` (opcional)

---

## Estatisticas para dashboard

### `GET /api/stats/summary`
Retorna cards gerais:
- total de apoios
- apoios hoje
- apoios ultimos 7 dias

### `GET /api/stats/by-state`
Retorna total por estado.

### `GET /api/stats/by-city?stateId=...`
Retorna total por cidade (com filtro opcional de estado).

### `GET /api/stats/chart?tab=all|state|city&stateId=&cityId=&groupBy=day|week|month`
Dados para grafico seguindo os mesmos filtros das abas.

Exemplo de retorno:
```json
{
  "labels": ["2026-03-01", "2026-03-02", "2026-03-03"],
  "values": [12, 18, 9]
}
```

---

## 6. Estrutura de Abas no Dashboard

## Aba `Todos`
- Lista todos os apoios
- Mostra total geral

## Aba `Estado`
- Select de estado
- Lista apoios daquele estado
- Mostra total do estado

## Aba `Cidade`
- Select de estado (opcional)
- Select de cidade
- Lista apoios da cidade
- Mostra total da cidade

## Aba `Grafico de Apoios`
- Mesmo conjunto de filtros das 3 abas acima
- Exibe serie temporal (dia/semana/mes)
- Pode exibir comparativo por estado/cidade

---

## 7. Tecnologias para o Dashboard (Frontend Admin)

Opcao recomendada:
- Next.js + React
- TanStack Query (fetch/caching)
- Chart.js ou Recharts
- Tailwind ou CSS Modules

Se quiser algo mais simples:
- HTML + JS + Chart.js consumindo a API REST

---

## 8. Validacoes e Seguranca

Obrigatorio no backend:
- Validar payload com Zod
- Sanitizar strings
- Rate limit no endpoint publico `POST /supports`
- CORS restrito por dominio
- Captcha (Cloudflare Turnstile ou reCAPTCHA) no formulario publico

Para dashboard admin:
- Login com JWT
- Senhas com bcrypt
- Rotas `/api/admin/*` protegidas

LGPD:
- Exibir consentimento no formulario
- Definir politica de retencao de dados

---

## 9. Roadmap de Implementacao

## Fase 1 - Base
- Subir API Node.js
- Configurar PostgreSQL + Prisma
- Criar tabela `supports` (com localizacao)
- Implementar `POST /api/supports`

## Fase 2 - Dashboard dados
- Implementar `GET /api/supports`
- Implementar `GET /api/stats/summary`
- Implementar `GET /api/stats/by-state` e `/by-city`

## Fase 3 - Grafico
- Implementar `GET /api/stats/chart`
- Conectar filtros da aba de grafico

## Fase 4 - Seguranca e producao
- Autenticacao admin
- Rate limit, captcha, logs
- Deploy

---

## 10. Exemplo de Setup Local

```bash
# 1) criar projeto backend
npm init -y

# 2) instalar dependencias
npm i fastify @fastify/cors zod dotenv prisma @prisma/client
npm i -D typescript tsx @types/node

# 3) prisma
npx prisma init
npx prisma migrate dev --name init

# 4) rodar api
npm run dev
```

---

## 11. Resultado Esperado

Com essa arquitetura voce tera:
- Um centro unico de dados (dashboard)
- Contagem correta de apoio por mensagem
- Separacao por `Todos`, `Estado` e `Cidade`
- Aba de grafico com os mesmos filtros
- Base pronta para escalar e auditar dados
