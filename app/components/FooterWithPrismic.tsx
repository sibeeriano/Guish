import * as React from "react"
import Image from "next/image"
import { cn } from "@/app/lib/utils"
import { ConfiguracionGlobalData } from "@/app/lib/getConfiguracionGlobal"

interface FooterWithPrismicProps {
  className?: string
  config?: ConfiguracionGlobalData | null
}

export default function FooterWithPrismic({ className, config }: FooterWithPrismicProps) {
  const currentYear = new Date().getFullYear()

  const footerTexto = config?.footerTexto || "Distribución oficial, licenciamiento y posicionamiento estratégico en canales de alto alcance."
  const contacto = config?.footerContacto
  const email = contacto?.email || "email@ejemplo.com"
  const telefono = contacto?.telefono || "+1 (555) 123-4567"
  const direccion = contacto?.direccion

  return (
    <footer
      className={cn(
        "bg-white/80 dark:bg-[#CBA98D]/80 backdrop-blur-md border-0",
        className
      )}
    >
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Columna 4: Imágenes - en móvil aparece al final, centrada */}
          <div className="flex flex-row gap-4 items-center justify-center lg:items-stretch lg:justify-end lg:col-start-4 lg:row-start-1 order-last lg:order-none">
            <a href="#inicio" className="relative w-24 h-24 lg:w-auto lg:h-full aspect-square lg:min-h-[120px] block cursor-pointer">
              <Image
                src="/sonriso.png"
                alt="Sonriso"
                fill
                className="object-contain"
              />
            </a>
            <a href="#inicio" className="relative w-24 h-24 lg:w-auto lg:h-full aspect-square lg:min-h-[120px] block cursor-pointer">
              <Image
                src="/saludo.png"
                alt="Saludo"
                fill
                className="object-contain"
              />
            </a>
          </div>
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Güish Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {footerTexto}
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#ff7300]">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-[#ff7300] hover:opacity-80 transition-opacity">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#partners-titulo" className="text-[#ff7300] hover:opacity-80 transition-opacity">
                  Partners
                </a>
              </li>
              <li>
                <a href="#presencia-y-alcance" className="text-[#ff7300] hover:opacity-80 transition-opacity">
                  Presencia y alcance
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#ff7300]">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{email}</li>
              <li>{telefono}</li>
              {direccion && <li>{direccion}</li>}
            </ul>
            {/* Redes Sociales */}
            {config?.redesSociales && config.redesSociales.length > 0 && (
              <div className="flex gap-4 pt-2">
                {config.redesSociales.map((red, index) => (
                  <a
                    key={index}
                    href={red.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff7300] hover:opacity-80 transition-opacity"
                  >
                    {red.plataforma}
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

