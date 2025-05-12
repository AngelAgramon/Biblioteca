import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: params.bookId,
      },
      select: {
        id: true,
        id_libro: true,
        titulo: true,
        autor: true,
        clasificacion: true,
        unidad: true,
        disponible: true,
      },
    });

    if (!book) {
      return NextResponse.json(
        { error: 'Libro no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error al obtener libro:', error);
    return NextResponse.json(
      { error: 'Error al obtener la información del libro' },
      { status: 500 }
    );
  }
} 