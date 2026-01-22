"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/app/lib/utils'

interface PreloaderProps {
  children: React.ReactNode
}

export default function Preloader({ children }: PreloaderProps) {
  const [loading, setLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      // Pequeño delay para asegurar que la animación se vea
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          setLoading(false)
        }, 500) // Duración de la animación de salida
      }, 600) // Tiempo mínimo de visualización
    }

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Fallback: ocultar después de máximo 3 segundos
      const timeout = setTimeout(handleLoad, 3000)
      return () => {
        clearTimeout(timeout)
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  if (!loading) {
    return <>{children}</>
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[100] flex items-center justify-center",
          "bg-[#FFF7F2]",
          "dark:bg-[#CBA98D]",
          "transition-all duration-500 ease-out",
          isExiting && "opacity-0 pointer-events-none"
        )}
      >
        {/* Preloader Moderno y Profesional - Diseño Limpio */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Spinner circular suave */}
          <div className="relative w-16 h-16">
            {/* Círculo exterior que rota */}
            <div 
              className="absolute inset-0 border-4 rounded-full"
              style={{ borderColor: 'rgba(255, 115, 0, 0.3)' }}
            />
            <div 
              className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
              style={{ 
                animationDuration: '1.2s',
                borderTopColor: '#ff7300',
                borderRightColor: '#ff7300'
              }}
            />
            
            {/* Círculo interior con pulso suave */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-8 h-8 border-2 rounded-full animate-pulse" 
                style={{ borderColor: '#ff7300' }} 
              />
            </div>
          </div>

          {/* Puntos de carga animados */}
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 bg-[#ff7300]/80 rounded-full" 
              style={{ 
                animation: 'loader-dot 1.4s ease-in-out infinite',
                animationDelay: '0s'
              }} 
            />
            <div 
              className="w-2 h-2 bg-[#ff7300]/80 rounded-full" 
              style={{ 
                animation: 'loader-dot 1.4s ease-in-out infinite',
                animationDelay: '0.2s'
              }} 
            />
            <div 
              className="w-2 h-2 bg-[#ff7300]/80 rounded-full" 
              style={{ 
                animation: 'loader-dot 1.4s ease-in-out infinite',
                animationDelay: '0.4s'
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Renderizar children pero ocultarlos mientras carga */}
      <div className={cn(loading && "opacity-0 pointer-events-none")}>
        {children}
      </div>
    </>
  )
}
