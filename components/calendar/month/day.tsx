import styled, { css, x } from "@xstyled/styled-components"
import { isSameDay } from "date-fns"
import { useEffect, useState } from "react"
import Transition from "react-tiny-transition"

import { Release } from "@/lib/igdb/types"
import { backgroundImage } from "@/styles/utils"
import { preloadImage } from "@/utils"

import { Game } from "./game"

const Container = styled.div<{
  dim?: boolean
  current: boolean
  clickable: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: lg;
  box-shadow: lg;
  overflow: hidden;

  ${(p) =>
    p.current &&
    css`
      box-shadow: 0 2px 30px #fff;
    `};

  ${(p) =>
    p.clickable &&
    css`
      cursor: pointer;
    `};

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
  onClick?: () => void
}

export const Day = ({ dim, date, releases, onClick }: Props) => {
  const [initial, setInitial] = useState(true)
  const [active, setActive] = useState(0)
  const upNext = releases?.[active + 1] != null ? active + 1 : 0

  useEffect(() => {
    if (releases?.[active + 1] == null) return

    void preloadImage(releases?.[active + 1].game.cover?.url)
  }, [releases?.[active + 1]])

  useEffect(() => {
    if (initial) setInitial(false)

    if ((releases?.length ?? 0) < 1) return

    const id = setTimeout(() => {
      setActive(upNext)
    }, 5 * 1000)

    return () => {
      clearTimeout(id)
    }
  }, [active])

  return (
    <Container
      dim={dim}
      current={isSameDay(date, new Date())}
      clickable={(releases?.length ?? 0) > 0}
      onClick={onClick}
    >
      <BlurredBackground blur colorMode="light" />

      <x.div
        position="absolute"
        p={3}
        fontSize="1.75rem"
        fontWeight="900"
        color="white"
        userSelect="none"
        // This is high because games have their own z-indexes for when they move around
        zIndex={100}
        style={{
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "white",
        }}
      >
        {date.getDate()}
      </x.div>

      {releases &&
        releases.slice(0, 5).map((release, i) => (
          <Transition key={release.id} disableInitialAnimation duration={1000}>
            {active === i && <Game initial={initial} release={release} />}
          </Transition>
        ))}
    </Container>
  )
}
