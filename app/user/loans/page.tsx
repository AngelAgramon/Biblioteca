"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Check, Clock, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"
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
  fechaLimite: string;
  fechaDevolucion: string | null;
  estado: 'ACTIVO' | 'DEVUELTO' | 'VENCIDO';
  book: Book;
  multa: number;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return 'bg-blue-100 text-blue-700'
      case 'DEVUELTO':
        return 'bg-green-100 text-green-700'
      case 'VENCIDO':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return <Clock className="h-5 w-5" />
      case 'DEVUELTO':
        return <CheckCircle className="h-5 w-5" />
      case 'VENCIDO':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
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
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900">Mis Préstamos</h1>
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
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
              <p className="text-gray-500">No tienes préstamos activos</p>
              <Link href="/catalog" className="mt-4 inline-block text-primary hover:text-primary-dark">
                Ver catálogo de libros
              </Link>
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
                        Fecha de Préstamo
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Fecha Límite
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Multa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{loan.book.titulo}</div>
                          <div className="text-sm text-gray-500">{loan.book.autor}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(loan.fechaPrestamo)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(loan.fechaLimite)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.estado)}`}>
                            {getStatusIcon(loan.estado)}
                            <span className="ml-1">
                              {loan.estado === 'ACTIVO' && 'Activo'}
                              {loan.estado === 'DEVUELTO' && 'Devuelto'}
                              {loan.estado === 'VENCIDO' && 'Vencido'}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {loan.multa > 0 ? (
                            <span className="text-red-600 font-medium">
                              ${loan.multa.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-gray-500">Sin multa</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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