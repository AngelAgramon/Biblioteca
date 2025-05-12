import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tipo para los datos del préstamo
interface LoanData {
  bookId: string;
  userId: string;
  fechaDevolucion: string | Date;
}

// Crear un nuevo préstamo
export async function POST(request: NextRequest) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const data = await request.json();
    const { bookId, userId, fechaDevolucion } = data as LoanData;

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Verificar que el libro existe y está disponible
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return NextResponse.json(
        { error: 'Libro no encontrado' },
        { status: 404 }
      );
    }

    if (!book.disponible) {
      return NextResponse.json(
        { error: 'El libro no está disponible para préstamo' },
        { status: 400 }
      );
    }

    // Crear el préstamo y actualizar disponibilidad del libro
    const loan = await prisma.$transaction(async (prisma) => {
      // Crear el préstamo
      const newLoan = await prisma.loan.create({
        data: {
          bookId,
          userId,
          fechaDevolucion: new Date(fechaDevolucion),
          estado: 'ACTIVO',
        },
      });

      // Actualizar la disponibilidad del libro
      await prisma.book.update({
        where: { id: bookId },
        data: { disponible: false },
      });

      return newLoan;
    });

    return NextResponse.json(loan, { status: 201 });
  } catch (error) {
    console.error('Error al crear préstamo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de préstamo' },
      { status: 500 }
    );
  }
}

// Obtener todos los préstamos (solo para administradores)
export async function GET() {
  try {
    // Obtener todos los préstamos con información de libros y usuarios
    const loans = await prisma.loan.findMany({
      include: {
        book: {
          select: {
            id_libro: true,
            titulo: true,
            autor: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            matricula: true,
          },
        },
      },
      orderBy: {
        fechaPrestamo: 'desc',
      },
    });

    return NextResponse.json(loans);
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los préstamos' },
      { status: 500 }
    );
  }
} 