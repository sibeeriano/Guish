import * as React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { cn } from "@/app/lib/utils"

interface ProductoDestacadoProps {
  titulo?: string
  descripcion?: string
  imagen?: string
  imagenAlt?: string
  ctaText?: string
  ctaHref?: string
  ctaText2?: string
  ctaHref2?: string
  alineacion?: "izquierda" | "derecha"
  className?: string
}

export default function ProductoDestacado({
  titulo = "Producto Destacado",
  descripcion = "Descubre nuestro producto estrella diseñado para transformar tu experiencia. Con características innovadoras y un diseño excepcional.",
  imagen,
  imagenAlt = "Producto destacado",
  ctaText = "Ver más detalles",
  ctaHref = "#producto",
  ctaText2,
  ctaHref2,
  alineacion = "izquierda",
  className,
}: ProductoDestacadoProps) {
  const isLeft = alineacion === "izquierda"

  return (
    <section
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-32",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Imagen */}
          <div className={cn(
            "order-1",
            isLeft ? "lg:order-1" : "lg:order-2"
          )}>
            {imagen ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <Image
                  src={imagen}
                  alt={imagenAlt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">Imagen del producto</span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className={cn(
            "order-2 space-y-4 sm:space-y-6 text-center flex flex-col items-center justify-center",
            "w-full lg:justify-self-center",
            isLeft ? "lg:order-2" : "lg:order-1"
          )}>
            <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#ff7300]">
                {titulo}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {descripcion}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center items-center w-full">
              {ctaText && (
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                  <a href={ctaHref || "#"}>{ctaText}</a>
                </Button>
              )}
              {ctaText2 && (
                <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 border-2 hover:border-primary w-full sm:w-auto transition-all duration-300 hover:scale-105" asChild>
                  <a href={ctaHref2 || "#"}>{ctaText2}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

