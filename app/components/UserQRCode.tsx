"use client"

import { useEffect, useState } from "react"

interface UserQRCodeProps {
  userId: string
  matricula: string
  userName: string
}

export default function UserQRCode({ userId, matricula, userName }: UserQRCodeProps) {
  const [qrImageUrl, setQrImageUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!matricula) return

    const generateQR = async () => {
      try {
        setLoading(true)
        // Usar una API gratuita para generar un código QR
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${matricula}`
        setQrImageUrl(qrUrl)
      } catch (error) {
        console.error("Error al generar el código QR:", error)
      } finally {
        setLoading(false)
      }
    }

    generateQR()
  }, [matricula])

  return (
    <div className="w-full bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Tu código QR</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Usa este código para registrar tu entrada a la biblioteca
        </p>
      </div>
      <div className="flex justify-center items-center p-6 border-t border-gray-200">
        {loading ? (
          <div className="h-[200px] w-[200px] bg-gray-200 animate-pulse rounded-md"></div>
        ) : qrImageUrl ? (
          <div className="h-[200px] w-[200px] relative flex items-center justify-center">
            <img
              src={qrImageUrl}
              alt={`Código QR para ${userName}`}
              className="max-w-full max-h-full object-contain"
              width={200}
              height={200}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No se pudo generar el código QR.
          </p>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-sm text-center text-gray-500">
        ID: {userId} • Matrícula: {matricula}
      </div>
    </div>
  )
} 