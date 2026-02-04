import * as React from "react"
import { SliceComponentProps } from "@prismicio/react"
import Hero from "@/app/components/Hero"
import * as prismic from "@prismicio/client"

export type HeroSlice = prismic.Content.HeroSlice

export default function HeroSliceComponent({
  slice,
}: SliceComponentProps<HeroSlice>) {
  const backgroundImage = slice.primary.imagen_fondo?.url || undefined
  const lettersImage = slice.primary.imagen_letras?.url || undefined
  const lettersImageAlt = slice.primary.imagen_letras?.alt || "güish"

  return (
    <Hero
      backgroundImage={backgroundImage}
      lettersImage={lettersImage}
      lettersImageAlt={lettersImageAlt}
    />
  )
}

