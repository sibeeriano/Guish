"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Evitar hidration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Sun className="h-5 w-5 text-[#ff7300] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#ff7300] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]" />
      ) : (
        <Moon className="h-5 w-5 text-[#ff7300] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]" />
      )}
    </Button>
  )
}

