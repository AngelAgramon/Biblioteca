import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const loans = await prisma.loan.findMany({
      where: {
        userId: params.userId,
      },
      include: {
        book: {
          select: {
            id_libro: true,
            titulo: true,
            autor: true,
            clasificacion: true,
          },
        },
      },
      orderBy: {
        fechaPrestamo: 'desc',
      },
    });

    // Actualizar estado de préstamos vencidos
    const today = new Date();
    const updatedLoans = await Promise.all(
      loans.map(async (loan) => {
        const fechaDevolucion = loan.fechaDevolucion;
        
        if (
          loan.estado === 'ACTIVO' && 
          fechaDevolucion && 
          new Date(fechaDevolucion) < today
        ) {
          // Actualizar el préstamo a vencido
          await prisma.loan.update({
            where: { id: loan.id },
            data: { estado: 'VENCIDO' },
          });
          
          return { ...loan, estado: 'VENCIDO' };
        }
        return loan;
      })
    );

    return NextResponse.json(updatedLoans);
  } catch (error) {
    console.error('Error al obtener préstamos del usuario:', error);
    return NextResponse.json(
      { error: 'Error al obtener los préstamos del usuario' },
      { status: 500 }
    );
  }
} 