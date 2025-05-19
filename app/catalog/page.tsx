"use client"

import React, { useState, useEffect } from "react"
import { BookOpen, Search, ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface Book {
  id: string
  id_libro: string
  titulo: string
  autor: string
  clasificacion: string
  unidad: number
  disponible: boolean
}

export default function Catalog() {
  const { data: session } = useSession()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 25

  useEffect(() => {
    // Cargar libros desde la API
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) throw new Error('Error al cargar libros')
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBooks()
  }, [])

  const filteredBooks = books.filter((book) => {
    const searchMatch = book.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    return searchMatch
  })

  // Calcular la paginación
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const endIndex = startIndex + booksPerPage
  const currentBooks = filteredBooks.slice(startIndex, endIndex)

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center text-gray-700 hover:text-primary">
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2">Volver</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Biblioteca ITT</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Hola, {session.user?.name}</span>
                  <Link
                    href="/api/auth/signout"
                    className="text-gray-700 hover:text-primary font-medium transition-colors duration-150"
                  >
                    Cerrar Sesión
                  </Link>
                  <Link
                    href="/user/loans"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
                  >
                    Mis Préstamos
                  </Link>
                </div>
              ) : (
                <>
                  <Link 
                    href="/api/auth/signin" 
                    className="text-gray-700 hover:text-primary font-medium transition-colors duration-150"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                Catálogo de Libros
              </h1>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar libro..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1) // Resetear a la primera página al buscar
                    }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                <p className="mt-2 text-gray-500">Cargando libros...</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Título / Autor
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Clasificación
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Unidad
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-4">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentBooks.map((book) => (
                        <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                                <BookOpen className="h-6 w-6 text-primary" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{book.titulo}</div>
                                <div className="text-sm text-gray-500">{book.autor}</div>
                                <div className="text-xs text-gray-400">ID: {book.id_libro}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{book.clasificacion}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">Unidad {book.unidad}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                                book.disponible
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {book.disponible ? "Disponible" : "No disponible"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            {session && book.disponible ? (
                              <Link href={`/loan/${book.id}`} className="flex items-center text-primary hover:text-primary-dark transition-colors duration-150">
                                <Calendar className="h-4 w-4 mr-1" />
                                Solicitar préstamo
                              </Link>
                            ) : (
                              <button className="text-primary hover:text-primary-dark transition-colors duration-150">
                                Ver detalles
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                        <span className="font-medium">{Math.min(endIndex, filteredBooks.length)}</span> de{' '}
                        <span className="font-medium">{filteredBooks.length}</span> resultados
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Anterior
                        </button>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded-md text-sm font-medium ${
                                currentPage === page
                                  ? 'bg-primary text-white'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Siguiente
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {!session && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-yellow-700">
                Para solicitar préstamos de libros, por favor <Link href="/api/auth/signin" className="font-semibold underline">inicia sesión</Link> o <Link href="/register" className="font-semibold underline">regístrate</Link>.
              </p>
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