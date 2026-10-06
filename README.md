# Alaksan

B2B-first сайт за дунапрен по размер - Next.js, Supabase (PostgreSQL + Prisma), NextAuth админ, GSAP анимации.

## Стартиране

1. Копирай `.env.example` → `.env` и попълни `DATABASE_URL` (Supabase connection string) и admin credentials.
2. `npm install`
3. `npx prisma migrate deploy` (или `npm run db:migrate` локално)
4. `npm run db:seed`
5. `npm run dev`

Публичен сайт: [http://localhost:3000](http://localhost:3000)  
Админ: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) - `ADMIN_EMAIL` / `ADMIN_PASSWORD` от `.env`.

## Supabase

- **DATABASE_URL**: Transaction pooler (port 6543) за runtime
- **DIRECT_URL** (optional): Direct connection за migrations - добави в `schema.prisma` при нужда

## Структура

- `/magazin` - каталог продукти
- `/magazin/[slug]` - продуктова страница (Конфигуратор / размери / неналичен)
- `/porachka-po-razmer` - конфигуратор (вид, L×W×T, количество)
- `/kolichka` - заявка (фирма / физ. лице)
- `/admin/dostavki` - поръчки
- `/admin/analiz` - статистика по дунапрен и размери
