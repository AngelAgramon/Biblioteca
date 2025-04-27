import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import prisma from "../../../../lib/prisma"

// Registrar la salida (actualizar exitTime de una entrada)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      )
    }

    const entryId = params.id
    
    if (!entryId) {
      return NextResponse.json(
        { message: "ID de entrada no proporcionado" },
        { status: 400 }
      )
    }

    // Verificar si la entrada existe y pertenece al usuario
    const entry = await prisma.entry.findUnique({
      where: { id: entryId },
    })

    if (!entry) {
      return NextResponse.json(
        { message: "Entrada no encontrada" },
        { status: 404 }
      )
    }

    // Verificar si el usuario es el dueño de la entrada o es admin
    const isOwner = entry.userId === session.user.id
    const isAdmin = session.user.role === "ADMIN"

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "No autorizado para modificar esta entrada" },
        { status: 403 }
      )
    }

    // Verificar si ya tiene registrada la salida
    if (entry.exitTime) {
      return NextResponse.json(
        { message: "La salida ya fue registrada" },
        { status: 400 }
      )
    }

    // Actualizar la entrada con la fecha de salida
    const updatedEntry = await prisma.entry.update({
      where: { id: entryId },
      data: { 
        exitTime: new Date(),
      },
    })

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error("Error registrando salida:", error)
    return NextResponse.json(
      { message: "Error al registrar salida" },
      { status: 500 }
    )
  }
} 