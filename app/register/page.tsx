"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"

export default function Register() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    matricula: "",
    carrera: "Ingeniería en Sistemas"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
    
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    
    // Validación de correo institucional
    if (!formData.email.endsWith('@tectijuana.edu.mx')) {
      setError("Debes utilizar un correo institucional (@tectijuana.edu.mx)")
      return
    }
    
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          matricula: formData.matricula,
          carrera: formData.carrera,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario")
      }
      
      // Iniciar sesión automáticamente
      const success = await login(formData.email, formData.password)
      
      if (success) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error al registrar el usuario"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Crea tu cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Inicia sesión
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Nombre completo"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="correo@ejemplo.com"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
                Matrícula
              </label>
              <input
                id="matricula"
                name="matricula"
                type="text"
                value={formData.matricula}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Ej. L12345678"
              />
            </div>
            
            <div>
              <label htmlFor="carrera" className="block text-sm font-medium text-gray-700">
                Carrera
              </label>
              <select
                id="carrera"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              >
                <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
                <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                <option value="Ingeniería Eléctrica">Ingeniería Eléctrica</option>
                <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                <option value="Ingeniería Química">Ingeniería Química</option>
                <option value="Ingeniería Civil">Ingeniería Civil</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 