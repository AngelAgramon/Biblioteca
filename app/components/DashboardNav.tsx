"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { Home, Book, User, LogOut, Menu, X } from "lucide-react"

export default function DashboardNav() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Registrar Entrada",
      href: "/dashboard/entry",
      icon: <Book className="w-5 h-5" />,
    },
    {
      name: "Mis Entradas",
      href: "/dashboard/entries",
      icon: <Book className="w-5 h-5" />,
    },
    {
      name: "Mi Perfil",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
  ]

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-primary font-bold text-xl">
                Biblioteca ITT
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === link.href
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center">
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-700">
                  Hola, {user.name.split(" ")[0]}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Abrir menú</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-3 py-2 text-base font-medium ${
                pathname === link.href
                  ? "text-primary bg-primary/5 border-l-4 border-primary"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user?.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-primary hover:bg-primary/5"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 