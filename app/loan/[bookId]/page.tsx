"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, BookOpen, Calendar, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Book {
  id: string
  id_libro: string
  titulo: string
  autor: string
  clasificacion: string
  unidad: number
  disponible: boolean
}

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function LoanPage({ params }: { params: { bookId: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/api/auth/signin')
    }
  })

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestingLoan, setRequestingLoan] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loanDueDate, setLoanDueDate] = useState<Date | null>(null)

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${params.bookId}`)
        if (!response.ok) {
          throw new Error('Libro no encontrado')
        }
        
        const bookData = await response.json()
        setBook(bookData)
        
        // Calcular fecha de préstamo (5 días desde hoy)
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 5)
        setLoanDueDate(dueDate)
      } catch (error) {
        console.error('Error:', error)
        setError('No se pudo cargar la información del libro')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBook()
  }, [params.bookId])

  const handleRequestLoan = async () => {
    const user = session?.user as User | undefined
    
    if (!user?.id || !book) return
    
    setRequestingLoan(true)
    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book.id,
          userId: user.id,
          fechaDevolucion: loanDueDate
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al solicitar el préstamo')
      }

      setSuccess(true)
      // Redireccionar después de 2 segundos
      setTimeout(() => {
        router.push('/user/loans')
      }, 2000)
    } catch (error: unknown) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'Error al solicitar el préstamo')
    } finally {
      setRequestingLoan(false)
    }
  }

  // Mostrar pantalla de carga mientras se verifica la sesión
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Cargando información...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si no se encontró el libro
  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Error</h1>
          <p className="text-center text-gray-600 mb-6">{error || 'No se encontró el libro solicitado'}</p>
          <div className="flex justify-center">
            <Link href="/catalog" className="inline-flex items-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // No permitir préstamos si el libro no está disponible
  if (!book.disponible) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
          <div className="flex items-center justify-center text-amber-600 mb-4">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Libro no disponible</h1>
          <p className="text-center text-gray-600 mb-6">El libro que intentas solicitar no está disponible actualmente.</p>
          <div className="flex justify-center">
            <Link href="/catalog" className="inline-flex items-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/catalog" className="mr-4 text-gray-500 hover:text-primary">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Solicitar préstamo</h1>
            </div>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center text-green-600 mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <BookOpen className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">¡Préstamo solicitado con éxito!</h2>
              <p className="text-green-600">
                Te estamos redirigiendo a la página de tus préstamos...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 rounded-lg p-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{book.titulo}</h2>
                    <p className="text-gray-600 mb-2">{book.autor}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500">ID</p>
                        <p className="text-sm font-medium">{book.id_libro}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Clasificación</p>
                        <p className="text-sm font-medium">{book.clasificacion}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Unidad</p>
                        <p className="text-sm font-medium">{book.unidad}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Estado</p>
                        <p className="text-sm font-medium text-green-700">Disponible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 bg-blue-50 rounded-full p-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Información del préstamo</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      El préstamo es por un periodo de <span className="font-semibold">5 días naturales</span>
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Fecha de devolución</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Debes devolver este libro antes del{" "}
                          <span className="font-semibold">
                            {loanDueDate?.toLocaleDateString('es-MX', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 mt-8">
                  <Link 
                    href="/catalog" 
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    Cancelar
                  </Link>
                  <button
                    onClick={handleRequestLoan}
                    disabled={requestingLoan}
                    className={`px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      requestingLoan ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {requestingLoan ? "Procesando..." : "Confirmar préstamo"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 