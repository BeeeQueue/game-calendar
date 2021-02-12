import { useEffect, useState } from "react"
import Transition from "react-tiny-transition"
import styled, { css, x } from "@xstyled/styled-components"

import { Release } from "@/lib/igdb/types"
import { backgroundImage } from "@/styles/utils"
import { preloadImage } from "@/utils"
import { Game } from "./game"

const Container = styled.div<{ dim?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: lg;
  box-shadow: lg;
  overflow: hidden;

  ${(p) =>
    p.dim &&
    css`
      opacity: 0.5;
    `};
`

const BlurredBackground = styled.div.attrs({
  blur: true,
})`
  position: absolute;
  left: -5%;
  top: -5%;
  height: 110%;
  width: 110%;
  z-index: 0;
  pointer-events: none;

  ${backgroundImage};
`

type Props = {
  date: Date
  dim?: boolean
  releases?: Release[]
}

export const Day = ({ dim, date, releases }: Props) => {
  const [active, setActive] = useState(0)
  const upNext = releases?.[active + 1] != null ? active + 1 : 1

  useEffect(() => {
    if (releases?.[active + 1] == null) return

    void preloadImage(releases?.[active + 1].game.cover?.url)
  }, [releases?.[active + 1]])

  return (
    <Container dim={dim} key={date.getTime()} onClick={() => setActive(upNext)}>
      <BlurredBackground blur colorMode="light" />

      <x.div
        position="absolute"
        p={3}
        fontSize="1.75rem"
        fontWeight="900"
        color="white"
        userSelect="none"
        zIndex={2}
        style={{
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "white",
        }}
      >
        {date.getDate()}
      </x.div>

      {releases &&
        releases.slice(0, 5).map((release, i) => (
          <Transition key={release.id} duration={500}>
            {active === i && (
              <Game index={i} active={active} release={release} />
            )}
          </Transition>
        ))}
    </Container>
  )
}
