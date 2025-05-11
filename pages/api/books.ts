import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search, category, location, availability } = req.query;

      let whereClause: any = {};

      // Búsqueda por texto
      if (search) {
        whereClause.OR = [
          { titulo: { contains: search as string, mode: 'insensitive' } },
          { autor: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      // Filtro por unidad
      if (location && location !== 'Todas') {
        whereClause.unidad = parseInt(location);
      }

      // Filtro por disponibilidad
      if (availability && availability !== 'Todos') {
        whereClause.loans = {
          some: {
            estado: availability === 'Disponibles' ? 'DEVUELTO' : 'ACTIVO',
          },
        };
      }

      const books = await prisma.book.findMany({
        where: whereClause,
        include: {
          loans: {
            where: {
              estado: 'ACTIVO',
            },
          },
        },
      });

      // Transformar los datos para el frontend
      const transformedBooks = books.map(book => ({
        id: book.id,
        title: book.titulo,
        author: book.autor,
        category: book.clasificacion,
        location: `Unidad ${book.unidad}`,
        available: book.loans.length === 0,
        copies: 1, // Por ahora asumimos 1 copia por libro
        coverImage: "/placeholder.svg?height=200&width=150",
        rating: 4.5, // Valor por defecto
        year: new Date(book.createdAt).getFullYear(),
        description: `Libro de ${book.autor} clasificado como ${book.clasificacion}`,
      }));

      res.status(200).json(transformedBooks);
    } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).json({ error: 'Error al obtener los libros' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 