import { css } from "styled-components"

type Props = {
  colorMode?: "light" | "dark"
  blur?: boolean
}

export const backgroundImage = css<Props>`
  background-image: url("/img/${(p) =>
    p.colorMode === "light" ? "day" : "night"}.webp");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  ${(p) =>
    p.blur
      ? css`
          filter: blur(6px) brightness(0.95);
        `
      : ""};
`
