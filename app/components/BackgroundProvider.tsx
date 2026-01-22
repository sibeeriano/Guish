"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface FondoConfig {
  tipo?: string
  color?: string
  imagen?: string
}

interface BackgroundProviderProps {
  fondoConfig?: FondoConfig
  children: React.ReactNode
}

export default function BackgroundProvider({ fondoConfig, children }: BackgroundProviderProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    const body = document.body
    const tipoFondo = fondoConfig?.tipo || "Gradiente"
    
    // Remover estilos anteriores
    body.style.background = ""
    body.style.backgroundImage = ""
    body.style.backgroundAttachment = ""
    body.style.backgroundSize = ""
    body.style.backgroundPosition = ""
    body.style.backgroundRepeat = ""

    if (tipoFondo === "Color" && fondoConfig?.color) {
      // Color sólido
      body.style.background = fondoConfig.color
      body.style.backgroundAttachment = "fixed"
    } else if (tipoFondo === "Imagen" && fondoConfig?.imagen) {
      // Imagen de fondo
      body.style.backgroundImage = `url(${fondoConfig.imagen})`
      body.style.backgroundSize = "cover"
      body.style.backgroundPosition = "center"
      body.style.backgroundRepeat = "no-repeat"
      body.style.backgroundAttachment = "fixed"
    } else {
      // Color de fondo por defecto
      if (theme === "dark") {
        body.style.background = "#CBA98D"
      } else {
        body.style.background = "#FFF7F2"
      }
      body.style.backgroundAttachment = "fixed"
    }
  }, [mounted, fondoConfig, theme])

  return <>{children}</>
}

