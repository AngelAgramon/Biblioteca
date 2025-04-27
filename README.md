# Biblioteca ITT

Sistema de gestión de biblioteca para el Instituto Tecnológico de Tijuana.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/products/docker-desktop/) (para la base de datos PostgreSQL)
- [Docker Compose](https://docs.docker.com/compose/install/) (normalmente incluido con Docker Desktop)

## Configuración inicial

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd biblioteca
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Configura la base de datos PostgreSQL usando Docker:

   **En macOS/Linux:**
   ```bash
   npm run db:setup
   ```

   **En Windows:**
   ```bash
   npm run db:setup:win
   ```

   Esto iniciará un contenedor Docker con PostgreSQL, generará el cliente Prisma y aplicará el esquema de base de datos.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Comandos útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run db:studio`: Abre Prisma Studio para gestionar la base de datos visualmente
- `npm run db:push`: Aplica cambios del esquema a la base de datos
- `npm run db:generate`: Regenera el cliente Prisma

## Estructura del proyecto

- `/app`: Código principal de la aplicación (Next.js App Router)
- `/app/api`: Rutas de API
- `/app/components`: Componentes reutilizables
- `/app/contexts`: Contextos de React (autenticación, etc.)
- `/prisma`: Esquema y configuración de la base de datos

## Tecnologías

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
