"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Check, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
}

interface Book {
  id_libro: string;
  titulo: string;
  autor: string;
}

interface Loan {
  id: string;
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: "ACTIVO" | "DEVUELTO" | "VENCIDO";
  book: Book;
}

export default function UserLoansPage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/api/auth/signin')
    }
  })

  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserLoans = async () => {
      if (!session?.user) return

      try {
        const user = session.user as User
        const response = await fetch(`/api/users/${user.id}/loans`)
        
        if (!response.ok) {
          throw new Error('Error al obtener los préstamos')
        }
        
        const data = await response.json()
        setLoans(data)
      } catch (error) {
        console.error('Error:', error)
        setError('No se pudieron cargar tus préstamos')
      } finally {
        setLoading(false)
      }
    }
    
    if (session?.user) {
      fetchUserLoans()
    }
  }, [session])

  const getStatusBadge = (estado: string, fechaDevolucion: string) => {
    const dueDate = new Date(fechaDevolucion)
    const today = new Date()
    
    // Verificar si el préstamo está vencido (fecha de devolución es anterior a hoy)
    const isOverdue = dueDate < today && estado === "ACTIVO"
    
    if (estado === "DEVUELTO") {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center">
          <Check className="h-3 w-3 mr-1" />
          Devuelto
        </span>
      )
    } else if (isOverdue) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Vencido
        </span>
      )
    } else {
      // Calcular días restantes
      const diffTime = Math.abs(dueDate.getTime() - today.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {diffDays} día(s) restante(s)
        </span>
      )
    }
  }
  
  // Mostrar pantalla de carga mientras se verifica la sesión
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Cargando tus préstamos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Link href="/catalog" className="flex items-center text-gray-700 hover:text-primary">
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2">Volver al catálogo</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Préstamos</h1>
          <p className="mt-2 text-gray-600">Gestiona tus préstamos activos y ve el historial de tus devoluciones.</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
            <div className="flex items-center justify-center text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 text-sm text-red-700 border border-red-300 rounded-md hover:bg-red-50"
            >
              Volver a intentar
            </button>
          </div>
        ) : loans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">No tienes préstamos activos</h2>
            <p className="mt-2 text-gray-600">
              Todavía no has solicitado ningún préstamo. Explora nuestro catálogo para encontrar libros de tu interés.
            </p>
            <div className="mt-6">
              <Link
                href="/catalog"
                className="inline-flex items-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Ver catálogo de libros
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Libro
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha de préstamo
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha de devolución
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{loan.book.titulo}</div>
                            <div className="text-xs text-gray-500">{loan.book.autor}</div>
                            <div className="text-xs text-gray-400">ID: {loan.book.id_libro}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(loan.fechaPrestamo).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(loan.fechaDevolucion).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(loan.estado, loan.fechaDevolucion)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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