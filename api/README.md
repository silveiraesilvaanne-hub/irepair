# iRepair API

API REST para o sistema de gestão de assistência técnica iRepair, com autenticação via JWT em cookie httpOnly.

## Tecnologias
- Node.js + Express + TypeScript
- Prisma ORM + MySQL
- bcrypt (hash de senha)
- jsonwebtoken (JWT)
- cookie-parser

## Rotas de autenticação
- `POST /auth/register` — cria um novo usuário
- `POST /auth/login` — autentica e retorna cookie httpOnly
- `POST /auth/logout` — limpa o cookie
- `GET /auth/me` — retorna o usuário autenticado (rota protegida)

## Rotas de negócio (protegidas por authMiddleware)
- `GET /clients`, `POST /clients`, `DELETE /clients/:id`
- `GET /devices`, `POST /devices`, `DELETE /devices/:id`
- `GET /service-orders`, `POST /service-orders`, `PUT /service-orders/:id`, `DELETE /service-orders/:id`

## Variáveis de ambiente (.env)
```
DATABASE_URL=
JWT_SECRET=
PORT=
DB_PASSWORD=
```