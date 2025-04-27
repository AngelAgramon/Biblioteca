"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, ChevronDown, Home, LogOut, Settings, Users } from "lucide-react"
//import Image from "next/image"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>("dashboard")

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      id: "catalog",
      label: "Catálogo",
      icon: <BookOpen className="h-5 w-5" />,
      href: "/catalog",
    },
    {
      id: "users",
      label: "Usuarios",
      icon: <Users className="h-5 w-5" />,
      href: "/users",
    },
    {
      id: "statistics",
      label: "Estadísticas",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/statistics",
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ]

  return (
    <div
      className={`bg-primary text-white transition-all duration-300 ease-in-out h-screen flex flex-col ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-4 flex items-center justify-between border-b border-green-700">
        <div className="flex items-center gap-2">
          {collapsed ? (
            <div className="w-10 h-10 relative">
              {/* <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec.jpg-2kF4THY5kdMPem4IptDvuvV9OeJ3CP.webp"
                alt="ITT Logo"
                width={40}
                height={40}
                className="object-contain"
              /> */}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                {/* <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec.jpg-2kF4THY5kdMPem4IptDvuvV9OeJ3CP.webp"
                  alt="ITT Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                /> */}
              </div>
              <span className="text-xl font-bold">Biblioteca ITT</span>
            </div>
          )}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/80 hover:text-white">
          <ChevronDown className={`h-5 w-5 transform transition-transform ${collapsed ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${activeMenu === item.id ? "bg-secondary text-white" : "text-white/80 hover:bg-green-700 hover:text-white"}
              `}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-green-700">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-green-700 hover:text-white rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Cerrar Sesión</span>}
        </Link>
      </div>
    </div>
  )
}

