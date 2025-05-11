"use client"

import React, { useState, useEffect } from "react"
import { BookOpen, ChevronLeft, ChevronRight, Filter, Search, Star } from "lucide-react"
import Header from "../components/layout/header"
import Sidebar from "../components/layout/sidebar"

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  location: string;
  available: boolean;
  copies: number;
  coverImage: string;
  rating: number;
  year: number;
  description: string;
}

export default function BookSearch() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedLocation, setSelectedLocation] = useState("Todas")
  const [selectedAvailability, setSelectedAvailability] = useState("Todos")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const categories = [
    "Todas",
    "Ingeniería en Sistemas",
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería Electrónica",
    "Ingeniería Mecánica",
    "Ingeniería Eléctrica",
    "Ingeniería Química",
    "Administración",
    "Contabilidad",
  ]

  const locations = ["Todas", "Unidad 1", "Unidad 2"]

  const availabilityOptions = ["Todos", "Disponibles", "No disponibles"]

  useEffect(() => {
    fetchBooks()
  }, [searchQuery, selectedCategory, selectedLocation, selectedAvailability])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        search: searchQuery,
        category: selectedCategory,
        location: selectedLocation,
        availability: selectedAvailability,
      })

      const response = await fetch(`/api/books?${queryParams}`)
      if (!response.ok) {
        throw new Error('Error al cargar los libros')
      }

      const data = await response.json()
      setBooks(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los libros. Por favor, intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchBooks()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca Digital ITT</h1>
              <p className="text-lg text-gray-600">Explora nuestro catálogo de más de 75,000 libros</p>

              <form onSubmit={handleSearch} className="mt-6 max-w-3xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título, autor o palabra clave..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary text-base"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 text-white bg-primary hover:bg-secondary rounded-r-md focus:outline-none"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros de búsqueda</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Ubicación
                    </label>
                    <select
                      id="location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                      Disponibilidad
                    </label>
                    <select
                      id="availability"
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedCategory("Todas")
                      setSelectedLocation("Todas")
                      setSelectedAvailability("Todos")
                      setSearchQuery("")
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-2"
                  >
                    Limpiar filtros
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </div>
            )}

            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{books.length}</span> de{" "}
                <span className="font-medium">{books.length}</span> libros
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-500"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-500"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">Cargando libros...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron libros</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Intenta con otros términos de búsqueda o ajusta los filtros.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 flex flex-col items-center">
                      {/* <img
                        src={book.coverImage || "/placeholder.svg"}
                        alt={`Portada de ${book.title}`}
                        className="h-48 object-cover mb-4"
                      /> */}
                      <h3 className="text-lg font-medium text-gray-900 text-center">{book.title}</h3>
                      <p className="text-sm text-gray-500 text-center">{book.author}</p>

                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-500">{book.rating}</span>
                      </div>

                      <div className="mt-2 flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.available ? "Disponible" : "No disponible"}
                        </span>
                        {book.available && <span className="ml-2 text-xs text-gray-500">{book.copies} ejemplares</span>}
                      </div>

                      <div className="mt-4 w-full">
                        <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {books.map((book) => (
                    <li key={book.id}>
                      <div className="px-4 py-4 sm:px-6 flex items-center">
                        <div className="flex-shrink-0 h-16 w-12 mr-4">
                          {/* <img
                            src={book.coverImage || "/placeholder.svg"}
                            alt={`Portada de ${book.title}`}
                            className="h-full w-full object-cover"
                          /> */}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-primary truncate">{book.title}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {book.available ? "Disponible" : "No disponible"}
                              </span>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center">
                            <p className="text-sm text-gray-500">{book.author}</p>
                            <span className="mx-1 text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{book.category}</p>
                            <span className="mx-1 text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{book.year}</p>
                          </div>
                          <div className="mt-1 flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-gray-500">{book.rating}</span>
                            <span className="mx-1 text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{book.location}</p>
                            {book.available && (
                              <>
                                <span className="mx-1 text-gray-500">•</span>
                                <p className="text-sm text-gray-500">{book.copies} ejemplares</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <button className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Anterior</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Siguiente</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

