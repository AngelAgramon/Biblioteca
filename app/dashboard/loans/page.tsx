"use client"

import { useState } from "react"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"

interface Loan {
  id: string
  book: {
    title: string
    author: string
    isbn: string
  }
  loanDate: string
  dueDate: string
  returnDate?: string
  status: "active" | "overdue" | "returned"
}

export default function Loans() {
  const [activeLoans] = useState<Loan[]>([
    {
      id: "1",
      book: {
        title: "Fundamentos de Programación",
        author: "Luis Joyanes Aguilar",
        isbn: "978-607-15-1292-9"
      },
      loanDate: "2024-03-20",
      dueDate: "2024-04-20",
      status: "active"
    },
    {
      id: "2",
      book: {
        title: "Cálculo Diferencial e Integral",
        author: "James Stewart",
        isbn: "978-607-15-1293-6"
      },
      loanDate: "2024-03-15",
      dueDate: "2024-04-15",
      status: "overdue"
    }
  ])

  const [loanHistory] = useState<Loan[]>([
    {
      id: "3",
      book: {
        title: "Redes de Computadoras",
        author: "Andrew S. Tanenbaum",
        isbn: "978-607-15-1294-3"
      },
      loanDate: "2024-02-01",
      dueDate: "2024-03-01",
      returnDate: "2024-02-28",
      status: "returned"
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Mis Préstamos</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Préstamos Activos */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Préstamos Activos</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{loan.book.title}</h3>
                        <p className="text-sm text-gray-500">{loan.book.author}</p>
                        <p className="text-xs text-gray-400">ISBN: {loan.book.isbn}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Préstamo: {loan.loanDate}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Devolución: {loan.dueDate}</span>
                      </div>
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                          loan.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {loan.status === "active" ? "Activo" : "Vencido"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Historial de Préstamos */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Historial de Préstamos</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {loanHistory.map((loan) => (
                <div key={loan.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{loan.book.title}</h3>
                        <p className="text-sm text-gray-500">{loan.book.author}</p>
                        <p className="text-xs text-gray-400">ISBN: {loan.book.isbn}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Préstamo: {loan.loanDate}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Devolución: {loan.returnDate}</span>
                      </div>
                      <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        Devuelto
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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