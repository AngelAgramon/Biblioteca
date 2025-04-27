"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"

export default function EntryRegistration() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    purpose: "",
    comments: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)
    
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Error al registrar entrada")
      }
      
      setSuccess(true)
      setFormData({
        purpose: "",
        comments: "",
      })
      
      // Opcional: redirigir después de un tiempo
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error al registrar entrada"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>Debes iniciar sesión para registrar tu entrada.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Registro de Entrada</h1>
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-md">
            ¡Entrada registrada exitosamente! Redirigiendo...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
              Propósito de la visita
            </label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Selecciona un propósito</option>
              <option value="Estudio">Estudio</option>
              <option value="Investigación">Investigación</option>
              <option value="Consulta">Consulta de material</option>
              <option value="Préstamo">Préstamo de material</option>
              <option value="Devolución">Devolución de material</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Comentarios adicionales
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={3}
              value={formData.comments}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Comentarios opcionales sobre tu visita"
            ></textarea>
          </div>
          
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full md:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
            >
              {isLoading ? "Registrando..." : "Registrar Entrada"}
            </button>
          </div>
        </form>
        
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Información del usuario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Nombre:</span> {user.name}
            </div>
            <div>
              <span className="font-medium">Correo:</span> {user.email}
            </div>
            {user.matricula && (
              <div>
                <span className="font-medium">Matrícula:</span> {user.matricula}
              </div>
            )}
            {user.carrera && (
              <div>
                <span className="font-medium">Carrera:</span> {user.carrera}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 