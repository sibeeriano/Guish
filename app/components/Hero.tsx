import * as React from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { cn } from "@/app/lib/utils"

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  backgroundImage?: string
  topImage?: string
  topImageAlt?: string
  className?: string
}

export default function Hero({
  title = "",
  subtitle = "",
  ctaText = "",
  ctaHref = "#video",
  backgroundImage,
  topImage,
  topImageAlt = "",
  className,
}: HeroProps) {
  return (
    <section
      id="inicio"
      className={cn(
        "relative flex min-h-[1000px] sm:min-h-[1200px] md:min-h-[1400px] items-center justify-center overflow-hidden -mt-16",
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover z-0"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient z-0" />
      )}

      {/* Overlay con gradiente más sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          {/* Imagen superior */}
          {topImage && (
            <div className="flex justify-center md:justify-start mb-6 sm:mb-8 md:mb-10">
              <div className="relative w-[280px] h-[200px] sm:w-[360px] sm:h-[260px] md:w-[480px] md:h-[340px] lg:w-[600px] lg:h-[420px] xl:w-[720px] xl:h-[500px]">
                <Image
                  src={topImage}
                  alt={topImageAlt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white px-2 text-center md:text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg px-4">
              {subtitle}
            </p>
          )}
          <div className="flex justify-start items-center pt-4 px-4">
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-md text-white border-0 hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

