import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { loanId } = await request.json()

    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        book: true,
        user: true
      }
    })

    if (!loan) {
      return NextResponse.json({ error: 'Préstamo no encontrado' }, { status: 404 })
    }

    // Si el préstamo ya está devuelto, no calcular multa
    if (loan.estado === 'DEVUELTO') {
      return NextResponse.json({ 
        message: 'Préstamo ya devuelto',
        multa: loan.multa 
      })
    }

    const ahora = new Date()
    const fechaLimite = new Date(loan.fechaLimite)
    
    // Calcular días de retraso
    const diasRetraso = Math.max(0, Math.floor((ahora.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24)))
    
    // Calcular multa (10 pesos por día)
    const multa = diasRetraso * 10

    // Actualizar la multa en la base de datos
    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: { 
        multa,
        estado: diasRetraso > 0 ? 'VENCIDO' : 'ACTIVO'
      }
    })

    return NextResponse.json({
      message: 'Multa calculada exitosamente',
      multa: updatedLoan.multa,
      diasRetraso,
      estado: updatedLoan.estado
    })

  } catch (error) {
    console.error('Error al calcular multa:', error)
    return NextResponse.json({ error: 'Error al calcular multa' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 