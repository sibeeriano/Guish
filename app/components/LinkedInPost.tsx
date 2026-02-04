"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

/**
 * Extrae el activity ID de una URL de post de LinkedIn.
 * Formatos: .../posts/...activity-7080300564386889729... o .../feed/update/urn:li:activity:7080300564386889729
 */
function getLinkedInActivityId(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null
  const trimmed = url.trim()
  // urn:li:activity:1234567890
  const urnMatch = trimmed.match(/urn:li:activity:(\d+)/i)
  if (urnMatch) return urnMatch[1]
  // activity-1234567890
  const activityMatch = trimmed.match(/activity-(\d+)/i)
  if (activityMatch) return activityMatch[1]
  return null
}

function LinkedInEmbed({ url }: { url: string }) {
  const activityId = getLinkedInActivityId(url)
  if (!activityId) {
    return (
      <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4 text-center text-sm text-[#927A5B] dark:text-white/80">
        URL no válida de post de LinkedIn. Pegá un enlace como: https://www.linkedin.com/posts/...activity-1234567890...
      </div>
    )
  }
  const embedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
  return (
    <div className="w-full overflow-hidden rounded-lg">
      <iframe
        src={embedUrl}
        title="Post de LinkedIn"
        className="w-full min-h-[400px] border-0 block"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

interface LinkedInPostProps {
  tituloSeccion?: string | null
  posts?: Array<{ url_post?: { url?: string } | string | null }> | null
  className?: string
}

export default function LinkedInPost({
  tituloSeccion,
  posts,
  className,
}: LinkedInPostProps) {
  const urls = React.useMemo(() => {
    if (!posts || !Array.isArray(posts)) return []
    return posts
      .map((item) => {
        const raw = item?.url_post
        if (!raw) return null
        const url = typeof raw === "string" ? raw : (raw as { url?: string })?.url
        return url && url.trim() ? url : null
      })
      .filter((u): u is string => Boolean(u))
  }, [posts])

  if (urls.length === 0) {
    return null
  }

  return (
    <section
      id="linkedin-posts"
      className={cn("container mx-auto px-4 py-12 md:px-6", className)}
    >
      {tituloSeccion && (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#ff7300] text-center mb-8">
          {tituloSeccion}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
        {urls.map((url, index) => (
          <LinkedInEmbed key={`${url}-${index}`} url={url} />
        ))}
      </div>
    </section>
  )
}
