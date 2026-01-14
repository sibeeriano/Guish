"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/app/lib/utils"
import { ConfiguracionGlobalData } from "@/app/lib/getConfiguracionGlobal"

interface HeaderWithPrismicProps {
  className?: string
  config?: ConfiguracionGlobalData | null
}

export default function HeaderWithPrismic({ className, config }: HeaderWithPrismicProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Usar datos de Prismic o valores por defecto
  const menuItems = config?.menuItems && config.menuItems.length > 0
    ? config.menuItems.map(item => ({ label: item.texto, href: item.enlace }))
    : [
        { label: "Inicio", href: "#inicio" },
        { label: "Partners", href: "#partners-titulo" },
        { label: "Presencia y alcance", href: "#presencia-y-alcance" },
        { label: "Contacto", href: "#contacto" },
      ]

  const logoUrl = config?.logo?.url
  const logoAlt = config?.logo?.alt || "Logo"

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para scroll suave a secciones
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 64 // Altura del header
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
      // Cerrar menú móvil si está abierto
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-0",
        isScrolled
          ? "bg-white/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/10"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={120}
                height={40}
                className={cn(
                  "h-10 w-auto transition-all duration-300",
                  !isScrolled && "drop-shadow-lg"
                )}
              />
            ) : (
              <span className={cn(
                "text-xl font-bold transition-colors text-[#ff7300]",
                "[text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]"
              )}>
                Logo
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={cn(
                "text-sm font-medium transition-all duration-300 ease-in-out",
                "hover:scale-105 text-[#ff7300]",
                "[text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]"
              )}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu - Theme Toggle and Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-[#ff7300] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]" /> : <Menu className="h-6 w-6 text-[#ff7300] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={cn(
          "md:hidden transition-all duration-300 border-0",
          isScrolled
            ? "bg-white/20 backdrop-blur-md"
            : "bg-black/80 backdrop-blur-md"
        )}>
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href)
                  setIsMenuOpen(false)
                }}
                className={cn(
                  "text-sm font-medium transition-all duration-300 ease-in-out py-2",
                  "hover:scale-105 hover:translate-x-1 text-[#ff7300]",
                  "[text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]"
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Tema:</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

