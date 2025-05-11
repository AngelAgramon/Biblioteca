"use client"

import React, { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import DashboardNav from "../components/DashboardNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-lg text-gray-700">Cargando...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="py-6">
        {children}
      </main>
    </div>
  )
} 