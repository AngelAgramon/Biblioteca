import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "../../../lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, matricula, carrera } = body as { name: string; email: string; password: string; matricula: string; carrera: string }

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Falta información requerida" },
        { status: 400 }
      )
    }

    // Validar correo institucional
    if (!email.endsWith('@tectijuana.edu.mx')) {
      return NextResponse.json(
        { message: "Debes utilizar un correo institucional (@tectijuana.edu.mx)" },
        { status: 400 }
      )
    }

    // Verificar si el correo ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electrónico ya está registrado" },
        { status: 409 }
      )
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        matricula,
        carrera,
        role: "USER",
      },
    })

    // Retornar usuario sin contraseña
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      matricula: user.matricula,
      carrera: user.carrera,
      role: user.role,
      createdAt: user.createdAt,
    }

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error registrando usuario:", error)
    return NextResponse.json(
      { message: "Error al registrar usuario" },
      { status: 500 }
    )
  }
} 