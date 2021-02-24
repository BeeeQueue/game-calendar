import Image from "next/image"
import styled from "@xstyled/styled-components"

import { Release } from "@/lib/igdb/types"
import { PlatformLogos } from "@/components/platform-logos"

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;

  &.before-enter {
    opacity: 0;
  }

  &.entering {
    opacity: 1;
    transition-timing-function: ease-out;
  }

  &.leaving {
    opacity: 0;
  }

  transition: opacity 1s ease-in;
`

type Props = {
  initial: boolean
  release: Pick<Release, "id" | "game" | "platforms">
}

export const Game = ({
  initial,
  release: {
    game: { name, cover },
    platforms,
  },
}: Props) => {
  return (
    <Container>
      {cover && (
        <Image
          unoptimized
          alt={name}
          src={`https:${cover.url.replace("t_thumb", "t_cover_big")}`}
          layout="fill"
          objectFit="cover"
          priority={initial}
        />
      )}

      <PlatformLogos platforms={platforms} />
    </Container>
  )
}
