"use client"
import React, { createContext, useContext, ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "USER"
  matricula?: string
  carrera?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAdmin: boolean
  status: "loading" | "authenticated" | "unauthenticated"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  
  const user = session?.user as User | null
  
  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    return !result?.error
  }
  
  const logout = async () => {
    await signOut({ redirect: false })
  }
  
  const isAdmin = user?.role === "ADMIN"
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, status }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
} 