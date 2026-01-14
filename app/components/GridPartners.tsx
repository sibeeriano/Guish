"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { cn } from "@/app/lib/utils"

interface Partner {
  id: string
  nombre: string
  descripcion: string
  imagen?: string
  url?: string
}

interface GridPartnersProps {
  titulo?: string
  subtitulo?: string
  partners?: Partner[]
  className?: string
}

const partnersDefault: Partner[] = [
  {
    id: "1",
    nombre: "Partner 1",
    descripcion: "Empresa líder en su sector, trabajando juntos para ofrecer soluciones innovadoras.",
    url: "http://google.com",
  },
  {
    id: "2",
    nombre: "Partner 2",
    descripcion: "Alianza estratégica que nos permite ampliar nuestro alcance y mejorar nuestros servicios.",
    url: "http://google.com",
  },
  {
    id: "3",
    nombre: "Partner 3",
    descripcion: "Colaboración exitosa que ha generado resultados excepcionales para nuestros clientes.",
    url: "http://google.com",
  },
  {
    id: "4",
    nombre: "Partner 4",
    descripcion: "Socio de confianza con quien compartimos valores y visión de futuro.",
    url: "http://google.com",
  },
]

export default function GridPartners({
  titulo = "Nuestros Partners",
  subtitulo = "Trabajamos con las mejores empresas del sector",
  partners = partnersDefault,
  className,
}: GridPartnersProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [itemsPerView, setItemsPerView] = React.useState(4)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [itemWidth, setItemWidth] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const itemRef = React.useRef<HTMLDivElement>(null)

  // Duplicar partners para crear efecto infinito
  const duplicatedPartners = React.useMemo(() => {
    return [...partners, ...partners, ...partners]
  }, [partners])

  // Calcular items por vista según el tamaño de pantalla
  React.useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1) // móvil
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2) // tablet
      } else {
        setItemsPerView(4) // desktop
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  // Recalcular ancho cuando cambia itemsPerView o el tamaño de ventana
  React.useEffect(() => {
    const updateItemWidth = () => {
      if (itemRef.current && carouselRef.current) {
        const gap = 24 // 1.5rem = 24px
        const containerWidth = carouselRef.current.offsetWidth
        const calculatedWidth = (containerWidth - (itemsPerView - 1) * gap) / itemsPerView
        setItemWidth(calculatedWidth + gap)
      }
    }

    updateItemWidth()
    window.addEventListener("resize", updateItemWidth)
    return () => window.removeEventListener("resize", updateItemWidth)
  }, [itemsPerView])

  // Calcular el ancho real de cada item
  React.useEffect(() => {
    if (itemRef.current && carouselRef.current) {
      const gap = 24 // 1.5rem = 24px
      const containerWidth = carouselRef.current.offsetWidth
      const calculatedWidth = (containerWidth - (itemsPerView - 1) * gap) / itemsPerView
      setItemWidth(calculatedWidth + gap)
    }
  }, [itemsPerView, partners.length])

  // Inicializar en el segundo conjunto de partners (el del medio)
  React.useEffect(() => {
    if (partners.length > 0) {
      const startIndex = partners.length
      setCurrentIndex(startIndex)
    }
  }, [partners.length])

  const goToPrevious = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      
      // Si llegamos al inicio del segundo conjunto, saltar al final del segundo conjunto
      if (newIndex < partners.length) {
        // Esperar a que termine la transición antes de saltar
        setTimeout(() => {
          setIsTransitioning(false) // Desactivar transición para el salto
          setCurrentIndex(partners.length * 2 - 1) // Saltar al final
        }, 500)
      } else {
        setTimeout(() => setIsTransitioning(false), 500)
      }
      
      return newIndex
    })
  }

  const goToNext = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const newIndex = prev + 1
      
      // Si llegamos al final del segundo conjunto, saltar al inicio del segundo conjunto
      if (newIndex >= partners.length * 2) {
        // Esperar a que termine la transición antes de saltar
        setTimeout(() => {
          setIsTransitioning(false) // Desactivar transición para el salto
          setCurrentIndex(partners.length) // Saltar al inicio
        }, 500)
      } else {
        setTimeout(() => setIsTransitioning(false), 500)
      }
      
      return newIndex
    })
  }

  const canGoPrevious = true // Siempre puede ir hacia atrás (infinito)
  const canGoNext = true // Siempre puede ir hacia adelante (infinito)

  return (
    <section
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-32",
        className
      )}
      id="partners"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 id="partners-titulo" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#ff7300]">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 drop-shadow-sm">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Carrusel de Partners */}
        <div className="relative">
          {/* Botón Anterior */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={isTransitioning}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 dark:bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full h-12 w-12 shadow-lg transition-opacity",
              isTransitioning && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-muted-foreground dark:text-muted-foreground" />
          </Button>

          {/* Contenedor del Carrusel */}
          <div className={cn(
            "overflow-hidden",
            partners.length > itemsPerView ? "mx-8 sm:mx-12 md:mx-16" : "mx-0"
          )}>
            <div
              ref={carouselRef}
              className="flex"
              style={{
                gap: "1.5rem",
                transform: itemWidth > 0 
                  ? `translateX(-${currentIndex * itemWidth}px)`
                  : `translateX(calc(-${currentIndex} * ((100% + 1.5rem) / ${itemsPerView})))`,
                transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
                willChange: "transform",
              }}
            >
              {duplicatedPartners.map((partner, index) => {
                // Calcular el ancho considerando el gap
                const gapSize = 1.5 // rem
                const totalGaps = itemsPerView - 1
                const itemWidthCalc = `calc((100% - ${totalGaps * gapSize}rem) / ${itemsPerView})`
                
                return (
                <div
                  key={`${partner.id}-${index}`}
                  ref={index === partners.length ? itemRef : null}
                  className="flex-shrink-0"
                  style={{ 
                    width: itemWidthCalc,
                    minWidth: itemWidthCalc,
                    maxWidth: itemWidthCalc,
                  }}
                >
                  <Card className="flex flex-col overflow-hidden bg-white/20 dark:bg-white/10 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 h-full">
                    <div className="relative aspect-video w-full overflow-hidden bg-white/10 dark:bg-white/5">
                      {partner.imagen ? (
                        <Image
                          src={partner.imagen}
                          alt={partner.nombre}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Logo Partner</span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="bg-transparent">
                      <CardTitle className="text-center drop-shadow-md">
                        <a
                          href={partner.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors underline"
                        >
                          {partner.nombre}
                        </a>
                      </CardTitle>
                      <CardDescription className="text-center drop-shadow-sm">{partner.descripcion}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                )
              })}
            </div>
          </div>

          {/* Botón Siguiente */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={isTransitioning}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 dark:bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full h-12 w-12 shadow-lg transition-opacity",
              isTransitioning && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6 text-muted-foreground dark:text-muted-foreground" />
          </Button>
        </div>

        {/* Indicadores de posición (dots) - basados en el índice real */}
        {partners.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {partners.map((_, index) => {
              const realIndex = currentIndex % partners.length
              return (
                <button
                  key={index}
                  onClick={() => {
                    const targetIndex = partners.length + index
                    setCurrentIndex(targetIndex)
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    realIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

