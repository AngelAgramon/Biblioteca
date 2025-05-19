import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener el usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener los préstamos del usuario
    const loans = await prisma.loan.findMany({
      where: { userId: user.id },
      include: {
        book: {
          select: {
            id: true,
            titulo: true,
            autor: true
          }
        }
      },
      orderBy: {
        fechaPrestamo: 'desc'
      }
    })

    // Calcular multas para préstamos activos
    const loansWithFines = await Promise.all(
      loans.map(async (loan) => {
        if (loan.estado === 'ACTIVO') {
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/loans/calculate-fine`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loanId: loan.id }),
          })
          
          if (response.ok) {
            const { multa } = await response.json()
            return { ...loan, multa }
          }
        }
        return loan
      })
    )

    return NextResponse.json(loansWithFines)

  } catch (error) {
    console.error('Error al obtener préstamos:', error)
    return NextResponse.json({ error: 'Error al obtener préstamos' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 