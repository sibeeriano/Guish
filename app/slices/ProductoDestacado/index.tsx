import * as React from "react"
import { SliceComponentProps } from "@prismicio/react"
import ProductoDestacado from "@/app/components/ProductoDestacado"
import * as prismic from "@prismicio/client"

export type ProductoDestacadoSlice = prismic.Content.ProductoDestacadoSlice

export default function ProductoDestacadoSliceComponent({
  slice,
}: SliceComponentProps<ProductoDestacadoSlice>) {
  const titulo = (slice.primary.titulo as string) || undefined
  const descripcion = prismic.asText(slice.primary.descripcion) || undefined
  const imagen = slice.primary.imagen?.url || undefined
  const imagenAlt = slice.primary.imagen?.alt || undefined
  const ctaText = (slice.primary.texto_boton as string) || undefined
  const ctaHref = (slice.primary.enlace_boton as string) || undefined
  const ctaText2 = (slice.primary.texto_boton_2 as string) || undefined
  const ctaHref2 = (slice.primary.enlace_boton_2 as string) || undefined
  // Normalizar el valor de posición (convertir a minúsculas)
  const posicionRaw = (slice.primary.posicion_imagen as string)?.toLowerCase() || "izquierda"
  const alineacion = (posicionRaw === "izquierda" || posicionRaw === "derecha") 
    ? (posicionRaw as "izquierda" | "derecha") 
    : "izquierda"

  return (
    <ProductoDestacado
      titulo={titulo}
      descripcion={descripcion}
      imagen={imagen}
      imagenAlt={imagenAlt}
      ctaText={ctaText}
      ctaHref={ctaHref}
      ctaText2={ctaText2}
      ctaHref2={ctaHref2}
      alineacion={alineacion}
    />
  )
}

