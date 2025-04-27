"use client"

import { useState } from "react"
import { Download, Filter, Search, User, UserPlus } from "lucide-react"
import Header from "../components/layout/header"
import Sidebar from "../components/layout/sidebar"

export default function Users() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState("Todas")

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const careers = [
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

  const users = [
    {
      id: "2021001",
      name: "Carlos Mendoza",
      email: "l19211234@tectijuana.edu.mx",
      phone: "664-123-4567",
      career: "Ingeniería en Sistemas",
      visits: 15,
      status: "active",
    },
    {
      id: "2021002",
      name: "Ana García",
      email: "l19211235@tectijuana.edu.mx",
      phone: "664-234-5678",
      career: "Ingeniería Química",
      visits: 8,
      status: "active",
    },
    {
      id: "2021003",
      name: "Miguel Ángel",
      email: "l19211236@tectijuana.edu.mx",
      phone: "664-345-6789",
      career: "Ingeniería Civil",
      visits: 12,
      status: "active",
    },
    {
      id: "2021004",
      name: "Laura Sánchez",
      email: "l19211237@tectijuana.edu.mx",
      phone: "664-456-7890",
      career: "Ingeniería Industrial",
      visits: 5,
      status: "active",
    },
    {
      id: "2021005",
      name: "Roberto Díaz",
      email: "l19211238@tectijuana.edu.mx",
      phone: "664-567-8901",
      career: "Administración",
      visits: 10,
      status: "active",
    },
    {
      id: "2020001",
      name: "Sofía Ramírez",
      email: "l18211239@tectijuana.edu.mx",
      phone: "664-678-9012",
      career: "Contabilidad",
      visits: 3,
      status: "inactive",
    },
    {
      id: "2020002",
      name: "Javier López",
      email: "l18211240@tectijuana.edu.mx",
      phone: "664-789-0123",
      career: "Ingeniería en Sistemas",
      visits: 0,
      status: "inactive",
    },
  ]

  const filteredUsers = users.filter((user) => {
    return selectedCareer === "Todas" || user.career === selectedCareer
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>

              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar usuario..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>

                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Nuevo Usuario
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="w-full sm:w-64">
                <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                  Carrera
                </label>
                <select
                  id="career"
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  {careers.map((career) => (
                    <option key={career} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Filtros
                </button>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <Download className="h-5 w-5 mr-2 text-gray-500" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Usuario
                          </th>
                         
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Contacto
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Visitas
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Estado
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Acciones</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-green-100 rounded-full">
                                  <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">#{user.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.career}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.email}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.visits}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.status === "active" ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-primary hover:text-secondary mr-3">
                                Editar
                              </a>
                              <a href="#" className="text-primary hover:text-secondary">
                                Historial
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{filteredUsers.length}</span> de{" "}
                <span className="font-medium">{users.length}</span> usuarios
              </div>

              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

