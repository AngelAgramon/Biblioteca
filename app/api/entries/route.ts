import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "../../lib/prisma"

// Registrar una nueva entrada
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { purpose, comments } = body as { purpose: string; comments: string }
    // Crear entrada
    const entry = await prisma.entry.create({
      data: {
        userId: session.user.id,
        purpose,
        comments,
        // entryTime se genera automáticamente con default(now())
      },
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error("Error registrando entrada:", error)
    return NextResponse.json(
      { message: "Error al registrar entrada" },
      { status: 500 }
    )
  }
}

// Obtener todas las entradas del usuario actual
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      )
    }

    // Para admin: opcional - obtener todas las entradas o filtrar por usuario
    const isAdmin = session.user.role === "ADMIN"
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    
    // Construir consulta base
    const query: { 
      where?: { userId: string },
      orderBy?: { entryTime: "asc" | "desc" }
    } = {}
    
    // Si es admin y se proporciona un userId, filtrar por ese usuario
    if (isAdmin && userId) {
      query.where = { userId }
    } else {
      // Si no es admin, solo puede ver sus propias entradas
      query.where = { userId: session.user.id }
    }
    
    // Ordenar por fecha de entrada, más reciente primero
    query.orderBy = { entryTime: "desc" }
    
    // Obtener las entradas según los criterios
    const entries = await prisma.entry.findMany({
      ...query,
      include: {
        user: {
          select: {
            name: true,
            matricula: true,
            carrera: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error obteniendo entradas:", error)
    return NextResponse.json(
      { message: "Error al obtener entradas" },
      { status: 500 }
    )
  }
} 