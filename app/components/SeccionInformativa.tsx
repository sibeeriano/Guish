import * as React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { cn } from "@/app/lib/utils"

interface SeccionInformativaProps {
  titulo?: string
  contenido?: string
  imagen?: string
  imagenAlt?: string
  ctaText?: string
  ctaHref?: string
  mostrarCTA?: boolean
  alineacion?: "izquierda" | "derecha"
  className?: string
}

export default function SeccionInformativa({
  titulo = "Información Importante",
  contenido = "Aquí puedes agregar información relevante sobre tu empresa, servicios o cualquier contenido que quieras destacar. Esta sección es perfecta para comunicar mensajes clave a tus visitantes.",
  imagen,
  imagenAlt = "Información",
  ctaText = "Contactar",
  ctaHref = "#contacto",
  mostrarCTA = true,
  alineacion = "derecha",
  className,
}: SeccionInformativaProps) {
  const isLeft = alineacion === "izquierda"

  return (
    <section
      id="contacto"
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-32",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Contenido */}
            <div className={cn(
              "space-y-4 sm:space-y-6",
              isLeft ? "order-2 md:order-2" : "order-2 md:order-1"
            )}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#ff7300] text-center md:text-left">
                {titulo}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                {contenido ? (
                  contenido.split('\n').filter(p => p.trim()).map((parrafo, index) => (
                    <p key={index}>{parrafo}</p>
                  ))
                ) : (
                  <p>{contenido}</p>
                )}
              </div>
              {mostrarCTA && (
                <div className="pt-4 sm:pt-6">
                  <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                    <a href={ctaHref}>{ctaText}</a>
                  </Button>
                </div>
              )}
            </div>

            {/* Imagen */}
            <div className={cn(
              isLeft ? "order-1 md:order-1" : "order-1 md:order-2"
            )}>
              {imagen ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <Image
                    src={imagen}
                    alt={imagenAlt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Imagen informativa</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

