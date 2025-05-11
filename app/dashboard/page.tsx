"use client"

import React from "react"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"
import { BookOpen, User, History } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()

  const cards = [
    {
      title: "Registrar Entrada",
      description: "Registra tu entrada a la biblioteca",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      href: "/dashboard/entry",
      color: "bg-blue-50",
    },
    {
      title: "Mis Entradas",
      description: "Ver historial de entradas",
      icon: <History className="h-8 w-8 text-primary" />,
      href: "/dashboard/entries",
      color: "bg-green-50",
    },
    {
      title: "Mi Perfil",
      description: "Actualiza tu información personal",
      icon: <User className="h-8 w-8 text-primary" />,
      href: "/dashboard/profile",
      color: "bg-purple-50",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Sistema de Gestión de Biblioteca del Instituto Tecnológico de Tijuana
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`${card.color} overflow-hidden rounded-lg shadow transition-all hover:shadow-md`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">{card.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-600">
                      {card.title}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {card.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Información Rápida</h2>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Horario de la Biblioteca
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <ul className="space-y-1">
                <li>Lunes a Viernes: 8:00 AM - 8:00 PM</li>
                <li>Sábados: 9:00 AM - 1:00 PM</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mt-5 mb-2">
              Reglas Generales
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <ul className="space-y-1">
                <li>Mantener silencio en las áreas de estudio</li>
                <li>No consumir alimentos dentro de la biblioteca</li>
                <li>Registrar entrada y salida</li>
                <li>Tratar los materiales con cuidado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 