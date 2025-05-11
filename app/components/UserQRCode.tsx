"use client"

import React from "react"
import { QRCodeSVG } from "qrcode.react"

interface UserQRCodeProps {
  userId: string
  matricula: string
  userName: string
}

export default function UserQRCode({ userId, matricula, userName }: UserQRCodeProps) {
  const qrValue = JSON.stringify({
    userId,
    matricula,
    userName,
    timestamp: new Date().toISOString()
  })

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tu Código QR</h3>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Muestra este código QR al entrar a la biblioteca
        </p>
      </div>
    </div>
  )
} 