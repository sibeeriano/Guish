import * as React from "react"
import { SliceComponentProps } from "@prismicio/react"
import LinkedInPost from "@/app/components/LinkedInPost"
import * as prismic from "@prismicio/client"

interface LinkedInPostSlicePrimary {
  titulo_seccion?: string | null
  posts?: Array<{ url_post?: prismic.LinkField }>
}
interface LinkedInPostSliceData {
  primary: LinkedInPostSlicePrimary
}

export default function LinkedInPostSliceComponent({
  slice,
}: SliceComponentProps<LinkedInPostSliceData>) {
  const tituloSeccion = slice.primary.titulo_seccion ?? undefined
  const items = slice.primary.posts ?? []
  const posts = items
    .map((item) => prismic.asLink(item.url_post))
    .filter((url): url is string => Boolean(url?.trim()))
    .map((url) => ({ url_post: url }))

  return (
    <LinkedInPost
      tituloSeccion={tituloSeccion}
      posts={posts}
    />
  )
}
