import * as React from "react"
import Image from "next/image"
import { cn } from "@/app/lib/utils"

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

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
              Distribución oficial, licenciamiento y posicionamiento estratégico en canales de alto alcance.
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
                <a href="#productos" className="text-[#ff7300] hover:opacity-80 transition-opacity">
                  Productos
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
              <li>email@ejemplo.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
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

