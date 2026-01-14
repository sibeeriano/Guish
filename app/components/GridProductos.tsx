import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { cn } from "@/app/lib/utils"

interface Partner {
  id: string
  nombre: string
  descripcion: string
  imagen?: string
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
  },
  {
    id: "2",
    nombre: "Partner 2",
    descripcion: "Alianza estratégica que nos permite ampliar nuestro alcance y mejorar nuestros servicios.",
  },
  {
    id: "3",
    nombre: "Partner 3",
    descripcion: "Colaboración exitosa que ha generado resultados excepcionales para nuestros clientes.",
  },
  {
    id: "4",
    nombre: "Partner 4",
    descripcion: "Socio de confianza con quien compartimos valores y visión de futuro.",
  },
]

export default function GridPartners({
  titulo = "Nuestros Partners",
  subtitulo = "Trabajamos con las mejores empresas del sector",
  partners = partnersDefault,
  className,
}: GridPartnersProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 bg-background",
        className
      )}
      id="partners"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#ff7300]">
            {titulo}
          </h2>
          {subtitulo && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitulo}
            </p>
          )}
        </div>

        {/* Grid de Partners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
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
              <CardHeader>
                <CardTitle className="text-center">{partner.nombre}</CardTitle>
                <CardDescription className="text-center">{partner.descripcion}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

