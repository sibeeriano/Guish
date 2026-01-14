import * as React from "react"
import Image from "next/image"
import { cn } from "@/app/lib/utils"

interface SeccionContenidoProps {
  titulo?: string
  contenido?: string
  imagen?: string
  imagenAlt?: string
  alineacion?: "izquierda" | "derecha"
  className?: string
}

export default function SeccionContenido({
  titulo = "Título de la sección",
  contenido = "Contenido descriptivo de la sección. Aquí puedes agregar información relevante sobre tu producto o servicio.",
  imagen,
  imagenAlt = "Imagen de la sección",
  alineacion = "izquierda",
  className,
}: SeccionContenidoProps) {
  const isLeft = alineacion === "izquierda"

  return (
    <section
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-32",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center",
            !isLeft && "md:flex-row-reverse"
          )}
        >
          {/* Imagen */}
          <div
            className={cn(
              "order-1",
              isLeft ? "md:order-1" : "md:order-2"
            )}
          >
            {imagen ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <Image
                  src={imagen}
                  alt={imagenAlt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center shadow-xl">
                <span className="text-gray-600 text-lg font-medium">Imagen placeholder</span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div
            className={cn(
              "order-2 space-y-4",
              isLeft ? "md:order-2" : "md:order-1"
            )}
          >
            {titulo && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#ff7300] text-center md:text-left">
                {titulo}
              </h2>
            )}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {contenido}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

