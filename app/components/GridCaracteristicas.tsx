import * as React from "react"
import Image from "next/image"
import { CheckCircle2, Zap, Shield, Users, Star, TrendingUp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { cn } from "@/app/lib/utils"

interface Caracteristica {
  id: string
  titulo: string
  descripcion: string
  icono?: React.ReactNode
  iconoImagen?: string // URL de la imagen del icono desde Prismic
  enlace?: string // URL de enlace para la imagen
}

interface GridCaracteristicasProps {
  titulo?: string
  subtitulo?: string
  caracteristicas?: Caracteristica[]
  className?: string
}

const iconosDefault = {
  check: <CheckCircle2 className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
  zap: <Zap className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
  shield: <Shield className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
  users: <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
  star: <Star className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
  trending: <TrendingUp className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />,
}

const caracteristicasDefault: Caracteristica[] = [
  {
    id: "1",
    titulo: "Fácil de usar",
    descripcion: "Interfaz intuitiva diseñada para que cualquier persona pueda utilizarla sin dificultad.",
    icono: iconosDefault.check,
  },
  {
    id: "2",
    titulo: "Rápido y eficiente",
    descripcion: "Optimizado para ofrecer el mejor rendimiento y velocidad en todas las operaciones.",
    icono: iconosDefault.zap,
  },
  {
    id: "3",
    titulo: "Seguro y confiable",
    descripcion: "Protección de datos de nivel empresarial con encriptación avanzada.",
    icono: iconosDefault.shield,
  },
  {
    id: "4",
    titulo: "Soporte 24/7",
    descripcion: "Equipo de expertos disponible en todo momento para ayudarte cuando lo necesites.",
    icono: iconosDefault.users,
  },
  {
    id: "5",
    titulo: "Calidad premium",
    descripcion: "Productos y servicios de la más alta calidad, probados y certificados.",
    icono: iconosDefault.star,
  },
  {
    id: "6",
    titulo: "Escalable",
    descripcion: "Crece con tu negocio, desde startups hasta grandes empresas.",
    icono: iconosDefault.trending,
  },
]

export default function GridCaracteristicas({
  titulo = "Características",
  subtitulo = "Todo lo que necesitas en un solo lugar",
  caracteristicas = caracteristicasDefault,
  className,
}: GridCaracteristicasProps) {
  return (
    <section
      className={cn(
        "py-12 sm:py-16 md:py-20 lg:py-32",
        className
      )}
      id="caracteristicas"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 id="presencia-y-alcance" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#ff7300]">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Grid de Características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {caracteristicas.map((caracteristica) => (
            <Card
              key={caracteristica.id}
              className="flex flex-col overflow-hidden bg-white/20 dark:bg-white/10 backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/10 dark:bg-white/5 flex items-center justify-center p-4 sm:p-6 md:p-8">
                {caracteristica.iconoImagen ? (
                  <div className="relative w-full h-full max-w-[180px] max-h-[180px] sm:max-w-[220px] sm:max-h-[220px] md:max-w-[260px] md:max-h-[260px]">
                    <Image
                      src={caracteristica.iconoImagen}
                      alt={caracteristica.titulo}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full max-w-[120px] max-h-[120px] sm:max-w-[140px] sm:max-h-[140px] md:max-w-[160px] md:max-h-[160px] text-primary">
                    {caracteristica.icono || iconosDefault.check}
                  </div>
                )}
              </div>
              <CardHeader className="bg-transparent">
                <CardTitle className="text-center text-xl">
                  {caracteristica.enlace ? (
                    <a
                      href={caracteristica.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground cursor-pointer hover:underline transition-all"
                    >
                  {caracteristica.titulo}
                    </a>
                  ) : (
                    caracteristica.titulo
                  )}
                </CardTitle>
                <CardDescription className="text-center leading-relaxed">
                  {caracteristica.descripcion}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

