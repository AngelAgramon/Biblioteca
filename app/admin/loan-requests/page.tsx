"use client"

import React, { useState } from "react"
//import { useAuth } from "../../contexts/AuthContext"
import { Calendar, Check, X, Clock } from "lucide-react"

interface LoanRequest {
  id: string
  user: {
    name: string
    email: string
    career: string
  }
  book: {
    title: string
    author: string
    isbn: string
  }
  requestDate: string
  status: "pending" | "approved" | "rejected"
}

export default function LoanRequests() {
  //const { user } = useAuth()
  const [requests] = useState<LoanRequest[]>([
    {
      id: "1",
      user: {
        name: "Carlos Mendoza",
        email: "l19211234@tectijuana.edu.mx",
        career: "Ingeniería en Sistemas"
      },
      book: {
        title: "Fundamentos de Programación",
        author: "Luis Joyanes Aguilar",
        isbn: "978-607-15-1292-9"
      },
      requestDate: "2024-03-25",
      status: "pending"
    },
    {
      id: "2",
      user: {
        name: "Ana García",
        email: "l19211235@tectijuana.edu.mx",
        career: "Ingeniería en Electrónica"
      },
      book: {
        title: "Cálculo Diferencial e Integral",
        author: "James Stewart",
        isbn: "978-607-15-1293-6"
      },
      requestDate: "2024-03-25",
      status: "approved"
    }
  ])

  const handleApprove = (id: string) => {
    // Implementar lógica de aprobación
    console.log("Aprobar solicitud:", id)
  }

  const handleReject = (id: string) => {
    // Implementar lógica de rechazo
    console.log("Rechazar solicitud:", id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Solicitudes de Préstamo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {requests.map((request) => (
                  <li key={request.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.user.name}
                        </p>
                        <p className="text-sm text-gray-500">{request.user.email}</p>
                        <p className="text-sm text-gray-500">{request.user.career}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {request.book.title}
                        </p>
                        <p className="text-sm text-gray-500">{request.book.author}</p>
                        <p className="text-sm text-gray-500">ISBN: {request.book.isbn}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{request.requestDate}</span>
                        </div>
                        {request.status === "pending" ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Rechazar
                            </button>
                          </div>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {request.status === "approved" ? "Aprobado" : "Rechazado"}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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