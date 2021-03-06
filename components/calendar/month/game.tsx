import Image from "next/image"

import styled, { css } from "@xstyled/styled-components"

import { PlatformLogos } from "@/components/platform-logos"
import { Release } from "@/lib/igdb/types"

const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;

  ${(p) =>
    p.visible === false &&
    css`
      position: absolute;
      opacity: 0;
    `};

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

const PlatformsContainer = styled.div`
  position: relative;
  margin-top: auto;
  padding: 6 2 2;
  width: 100%;
  overflow: hidden;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), transparent);
`

type Props = {
  visible?: boolean
  initial: boolean
  release: Pick<Release, "id" | "game" | "platforms">
}

export const Game = ({
  visible = true,
  initial,
  release: {
    game: { name, cover },
    platforms,
  },
}: Props) => {
  return (
    <Container visible={visible}>
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

      <PlatformsContainer>
        <PlatformLogos platforms={platforms} />
      </PlatformsContainer>
    </Container>
  )
}
