import type { x } from "@xstyled/styled-components"
import { ComponentPropsWithoutRef } from "react"

export const getBackgroundImage = (
  theme: "light" | "dark",
  blur: boolean
): ComponentPropsWithoutRef<typeof x.div> => ({
  backgroundColor: "warm-gray-900-a20",
  backgroundImage: `url(/img/${theme === "light" ? "day" : "night"}.webp)`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  style: blur ? { filter: "blur(6px) brightness(0.9)" } : undefined,
})
