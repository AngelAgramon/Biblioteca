"use client"

import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Libros", href: "/admin/books", icon: BookOpen },
  { name: "Préstamos", href: "/admin/loans", icon: Calendar },
  { name: "Reportes", href: "/admin/reports", icon: BarChart3 },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra lateral móvil */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Biblioteca ITT</span>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-5 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 w-full p-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-4 h-6 w-6 text-gray-400" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra lateral de escritorio */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">Biblioteca ITT</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-6 w-6 text-gray-400" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Buscar..."
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
} 