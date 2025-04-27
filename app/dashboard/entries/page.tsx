"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Link from "next/link"

interface Entry {
  id: string
  entryTime: string
  exitTime: string | null
  purpose: string | null
  comments: string | null
}

export default function EntriesHistory() {
  const { user, status } = useAuth()
  const [entries, setEntries] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEntries = async () => {
      if (status !== "authenticated") return

      try {
        const response = await fetch("/api/entries")
        
        if (!response.ok) {
          throw new Error("Error al obtener las entradas")
        }
        
        const data = await response.json()
        setEntries(data)
      } catch (error) {
        console.error("Error:", error)
        setError("No se pudieron cargar las entradas")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [status])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const handleRegisterExit = async (entryId: string) => {
    try {
      const response = await fetch(`/api/entries/${entryId}/exit`, {
        method: "PATCH",
      })

      if (!response.ok) {
        throw new Error("Error al registrar la salida")
      }

      // Actualizar la lista de entradas
      const updatedEntries = entries.map(entry => 
        entry.id === entryId 
          ? { ...entry, exitTime: new Date().toISOString() } 
          : entry
      )
      
      setEntries(updatedEntries)
    } catch (error) {
      console.error("Error:", error)
      setError("No se pudo registrar la salida")
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tu historial de entradas.</p>
          <Link href="/login" className="text-primary mt-2 inline-block">
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Historial de Entradas</h1>
        <p className="text-gray-600 mt-1">Revisa tu historial de visitas a la biblioteca</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center text-gray-600">Cargando entradas...</div>
        ) : entries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Entrada
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Salida
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propósito
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comentarios
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(entry.entryTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.exitTime ? formatDate(entry.exitTime) : "Sin registrar"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.purpose || "No especificado"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {entry.comments || "No hay comentarios"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!entry.exitTime && (
                        <button
                          onClick={() => handleRegisterExit(entry.id)}
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          Registrar Salida
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600">
            <p className="mb-4">No tienes entradas registradas.</p>
            <Link href="/dashboard/entry" className="text-primary hover:text-primary/80 font-medium">
              Registrar una entrada
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 