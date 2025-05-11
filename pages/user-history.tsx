"use client"

import React, { useState } from "react"
import { ArrowLeft, BookOpen, Calendar, Clock, Download, Filter, Search, User } from "lucide-react"
import Header from "../components/layout/header"
import Sidebar from "../components/layout/sidebar"
import Link from "next/link"

export default function UserHistory() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const userData = {
    id: "2021001",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@ejemplo.com",
    phone: "555-123-4567",
    career: "Ingeniería en Sistemas",
    visits: 15,
    status: "active",
  }

  const userHistory = [
    {
      id: 1,
      type: "Préstamo",
      book: "Fundamentos de Programación",
      date: "15/05/2023",
      time: "10:30 AM",
      returnDate: "29/05/2023",
      status: "Devuelto",
    },
    {
      id: 2,
      type: "Consulta",
      book: "Redes de Computadoras",
      date: "18/05/2023",
      time: "02:15 PM",
      returnDate: null,
      status: "Completado",
    },
    {
      id: 3,
      type: "Préstamo",
      book: "Inteligencia Artificial",
      date: "22/05/2023",
      time: "11:45 AM",
      returnDate: "05/06/2023",
      status: "Devuelto",
    },
    {
      id: 4,
      type: "Préstamo",
      book: "Bases de Datos",
      date: "01/06/2023",
      time: "09:20 AM",
      returnDate: "15/06/2023",
      status: "En curso",
    },
    {
      id: 5,
      type: "Consulta",
      book: "Algoritmos y Estructuras de Datos",
      date: "05/06/2023",
      time: "03:30 PM",
      returnDate: null,
      status: "Completado",
    },
    {
      id: 6,
      type: "Préstamo",
      book: "Sistemas Operativos",
      date: "10/06/2023",
      time: "10:00 AM",
      returnDate: "24/06/2023",
      status: "En curso",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/users" className="mr-4 text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">Historial de Usuario</h1>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Información del Usuario</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales y registros.</p>
                </div>
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-indigo-100 rounded-full">
                  <User className="h-10 w-10 text-indigo-600" />
                </div>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.name}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Número de control</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">#{userData.id}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Carrera</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.career}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.phone}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Total de visitas</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.visits}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Actividades Recientes</h2>

              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar actividad..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Filtrar
                </button>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Download className="h-5 w-5 mr-2 text-gray-500" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {userHistory.map((activity) => (
                  <li key={activity.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-lg">
                          <BookOpen className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{activity.book}</div>
                          <div className="text-sm text-gray-500">{activity.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            activity.status === "En curso"
                              ? "bg-yellow-100 text-yellow-800"
                              : activity.status === "Devuelto"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500 mr-6">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {activity.date}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {activity.time}
                        </div>
                      </div>
                      {activity.returnDate && (
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="mr-1.5">Fecha de devolución:</span>
                          {activity.returnDate}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

