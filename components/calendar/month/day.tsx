import styled, { x } from "@xstyled/styled-components"

import { ReleaseResponse } from "@/lib/igdb"
import { backgroundImage } from "@/styles/utils"
import { filterDuplicateGames } from "@/utils"
import { Game } from "./game"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: lg;
  box-shadow: lg;
  overflow: hidden;
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
  index: number
  releases?: ReleaseResponse[]
}

export const Day = ({ index, releases }: Props) => {
  const filteredReleases = filterDuplicateGames(releases ?? [])

  return (
    <Container key={index}>
      <BlurredBackground blur colorMode="light" />

      <x.div
        p={3}
        fontSize="1.75rem"
        fontWeight="900"
        color="white"
        userSelect="none"
        zIndex={2}
        style={{
          // @ts-ignore
          "-webkit-text-stroke": "1px black",
          "-webkit-text-fill-color": "white",
        }}
      >
        {index + 1}
      </x.div>

      <x.div display="flex" zIndex={1}>
        {filteredReleases.length > 0 &&
          filteredReleases
            .slice(0, 1)
            .map((release) => <Game key={release.id} release={release} />)}
      </x.div>
    </Container>
  )
}
