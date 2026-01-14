import * as React from "react"
import { cn } from "@/app/lib/utils"

interface VideoSectionProps {
  videoUrl?: string
  title?: string
  className?: string
}

export default function VideoSection({
  videoUrl,
  title = "Video",
  className,
}: VideoSectionProps) {
  // Función para convertir URL de YouTube a formato embed con autoplay
  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    
    let embedBaseUrl = ""
    let videoId = ""
    let params = "autoplay=1&mute=1&loop=1" // Autoplay con mute (requerido por navegadores)
    
    // YouTube
    if (url.includes("youtube.com/watch")) {
      videoId = url.split("v=")[1]?.split("&")[0]
      embedBaseUrl = `https://www.youtube.com/embed/${videoId}`
      params += `&playlist=${videoId}` // Necesario para loop en YouTube
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0]
      embedBaseUrl = `https://www.youtube.com/embed/${videoId}`
      params += `&playlist=${videoId}` // Necesario para loop en YouTube
    }
    // Vimeo
    else if (url.includes("vimeo.com/")) {
      videoId = url.split("vimeo.com/")[1]?.split("?")[0]
      embedBaseUrl = `https://player.vimeo.com/video/${videoId}`
      params = "autoplay=1&mute=1&loop=1" // Vimeo también requiere mute para autoplay
    }
    // Si ya es una URL de embed, agregar parámetros
    else if (url.includes("embed") || url.includes("player.vimeo.com")) {
      // Si ya tiene parámetros, agregar los nuestros
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}${params}`
    }
    
    return videoId ? `${embedBaseUrl}?${params}` : ""
  }

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : ""

  if (!embedUrl) {
    return null
  }

  return (
    <section
      id="video"
      className={cn(
        "w-full",
        className
      )}
    >
      <div className="w-full">
        <div className="relative aspect-video w-full overflow-hidden">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

