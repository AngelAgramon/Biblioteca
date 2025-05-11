"use client"

import React, { useState } from "react"
import { BookOpen, Users, Calendar, BarChart3, Search, User, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../../contexts/AuthContext"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    {
      name: "Total de Usuarios",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: Users,
    },
    {
      name: "Préstamos Activos",
      value: "456",
      change: "+8%",
      changeType: "increase",
      icon: BookOpen,
    },
    {
      name: "Devoluciones Pendientes",
      value: "23",
      change: "-5%",
      changeType: "decrease",
      icon: Calendar,
    },
    {
      name: "Libros Disponibles",
      value: "789",
      change: "+3%",
      changeType: "increase",
      icon: BarChart3,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      user: {
        name: "Carlos Mendoza",
        email: "l19211234@tectijuana.edu.mx",
      },
      action: "Solicitó préstamo",
      book: "Fundamentos de Programación",
      time: "Hace 5 minutos",
    },
    {
      id: 2,
      user: {
        name: "Ana García",
        email: "l19211235@tectijuana.edu.mx",
      },
      action: "Devolvió libro",
      book: "Cálculo Diferencial",
      time: "Hace 15 minutos",
    },
    {
      id: 3,
      user: {
        name: "Miguel Ángel",
        email: "l19211236@tectijuana.edu.mx",
      },
      action: "Renovó préstamo",
      book: "Redes de Computadoras",
      time: "Hace 1 hora",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Biblioteca ITT</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>

              <Link
                href="/admin/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary"
              >
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Actividad Reciente */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.user.name}
                          </p>
                          <p className="text-sm text-gray-500">{activity.user.email}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            {activity.action} - {activity.book}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">{activity.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/admin/users"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Gestionar Usuarios</p>
                    <p className="text-sm text-gray-500">Administrar cuentas</p>
                  </div>
                </Link>

                <Link
                  href="/admin/books"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Gestionar Libros</p>
                    <p className="text-sm text-gray-500">Catálogo y ejemplares</p>
                  </div>
                </Link>

                <Link
                  href="/admin/loans"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Gestionar Préstamos</p>
                    <p className="text-sm text-gray-500">Solicitudes y devoluciones</p>
                  </div>
                </Link>

                <Link
                  href="/admin/reports"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Reportes</p>
                    <p className="text-sm text-gray-500">Estadísticas y análisis</p>
                  </div>
                </Link>

                <Link
                  href="/admin/settings"
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                >
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">Configuración</p>
                    <p className="text-sm text-gray-500">Ajustes del sistema</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2024 Instituto Tecnológico de Tijuana. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
} 