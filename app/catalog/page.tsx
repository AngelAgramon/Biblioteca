"use client"

import { useState } from "react"
import { BookOpen, Filter, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Book {
  id: number
  title: string
  author: string
  category: string
  location: string
  available: boolean
  copies: number
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedLocation, setSelectedLocation] = useState("Todas")

  const categories = [
    "Todos",
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

  const locations = ["Todas", "Unidad Tijuana", "Unidad Tomás Aquino"]

  const books: Book[] = [
    {
      id: 1,
      title: "Fundamentos de Programación",
      author: "Luis Joyanes Aguilar",
      category: "Ingeniería en Sistemas",
      location: "Unidad Tijuana",
      available: true,
      copies: 5,
    },
    {
      id: 2,
      title: "Cálculo Diferencial e Integral",
      author: "James Stewart",
      category: "Ingeniería Civil",
      location: "Unidad Tomás Aquino",
      available: true,
      copies: 8,
    },
    {
      id: 3,
      title: "Redes de Computadoras",
      author: "Andrew S. Tanenbaum",
      category: "Ingeniería en Sistemas",
      location: "Unidad Tijuana",
      available: false,
      copies: 0,
    },
    {
      id: 4,
      title: "Inteligencia Artificial",
      author: "Stuart Russell, Peter Norvig",
      category: "Ingeniería en Sistemas",
      location: "Unidad Tomás Aquino",
      available: true,
      copies: 3,
    },
    {
      id: 5,
      title: "Administración Moderna",
      author: "Samuel C. Certo",
      category: "Administración",
      location: "Unidad Tijuana",
      available: true,
      copies: 6,
    },
    {
      id: 6,
      title: "Resistencia de Materiales",
      author: "Ferdinand P. Beer",
      category: "Ingeniería Civil",
      location: "Unidad Tomás Aquino",
      available: true,
      copies: 4,
    },
    {
      id: 7,
      title: "Circuitos Eléctricos",
      author: "James W. Nilsson",
      category: "Ingeniería Eléctrica",
      location: "Unidad Tijuana",
      available: true,
      copies: 2,
    },
    {
      id: 8,
      title: "Física Universitaria",
      author: "Sears Zemansky",
      category: "Ingeniería Mecánica",
      location: "Unidad Tomás Aquino",
      available: false,
      copies: 0,
    },
  ]

  const filteredBooks = books.filter((book) => {
    const categoryMatch = selectedCategory === "Todos" || book.category === selectedCategory
    const locationMatch = selectedLocation === "Todas" || book.location === selectedLocation
    return categoryMatch && locationMatch
  })

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
              <Link 
                href="/login" 
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
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  />
                </div>

                <button className="inline-flex items-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Filtros Avanzados
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Carrera
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="block w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Título / Autor
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Carrera
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ubicación
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ejemplares
                    </th>
                    <th scope="col" className="relative px-6 py-4">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{book.title}</div>
                            <div className="text-sm text-gray-500">{book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{book.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{book.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                            book.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {book.available ? "Disponible" : "No disponible"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{book.copies}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark transition-colors duration-150">
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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