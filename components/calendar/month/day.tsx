import styled, { css, x } from "@xstyled/styled-components"

import { backgroundImage } from "@/styles/utils"
import { Game } from "./game"
import { Release } from "@/lib/igdb/types"

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

  ${backgroundImage};
`

type Props = {
  date: Date
  dim?: boolean
  releases?: Release[]
}

export const Day = ({ dim, date, releases }: Props) => (
  <Container dim={dim} key={date.getTime()}>
    <BlurredBackground blur colorMode="light" />

    <x.div
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
      {date.getDay()}
    </x.div>

    <x.div display="flex" zIndex={1}>
      {releases &&
        releases
          .slice(0, 1)
          .map((release) => <Game key={release.id} release={release} />)}
    </x.div>
  </Container>
)
