"use client"

import React, { useState } from "react"
import { User, Mail, GraduationCap, Calendar } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import UserQRCode from "../../components/UserQRCode"

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    career: user?.carrera || "Ingeniería en Sistemas",
    studentId: user?.matricula || "",
    joinDate: "2024-01-15"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Cargando información del usuario...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <User className="h-6 w-6 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Mi Perfil</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-24 w-24 flex items-center justify-center bg-primary/10 rounded-full">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
                      <p className="text-sm text-gray-500">Actualiza tu información de perfil</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre Completo
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo Electrónico
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                        Carrera
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="career"
                          id="career"
                          value={formData.career}
                          onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                        Matrícula
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="studentId"
                          id="studentId"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          disabled={!isEditing}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                        Fecha de Registro
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="joinDate"
                          id="joinDate"
                          value={formData.joinDate}
                          disabled
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Guardar Cambios
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Editar Perfil
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {user.matricula ? (
                <UserQRCode 
                  userId={user.id} 
                  matricula={user.matricula} 
                  userName={user.name}
                />
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-600">Completa tu perfil añadiendo tu matrícula para generar un código QR.</p>
                </div>
              )}
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