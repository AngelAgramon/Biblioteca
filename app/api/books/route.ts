import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        id_libro: true,
        titulo: true,
        autor: true,
        clasificacion: true,
        unidad: true,
        disponible: true,
      },
      orderBy: {
        titulo: 'asc',
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    return NextResponse.json(
      { error: 'Error al obtener los libros' },
      { status: 500 }
    );
  }
} 