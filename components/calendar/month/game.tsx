import Image from "next/image"
import styled, { css } from "@xstyled/styled-components"

import { Release } from "@/lib/igdb/types"
import { PlatformLogos } from "@/components/platform-logos"

const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  
  &.before-enter {
    transform: translateX(-100%);
  }
  
  &.entering {
    transform: translateX(0);
  }
  
  transition: transform 0.5s;
  
  ${(p) =>
    css`
      opacity: ${p.visible ? 1 : 0};
    `};
`

type Props = {
  index: number
  active: number
  release: Pick<Release, "id" | "game" | "platforms">
}

export const Game = ({
  index,
  active,
  release: {
    id,
    game: { cover },
    platforms,
  },
}: Props) => {
  const visible = index === active
  const upNext = active + 1 === index

  return (
    <Container key={id} visible={visible}>
      {(visible || upNext) && cover && (
        <Image
          unoptimized
          src={`https:${cover.url.replace("t_thumb", "t_cover_big")}`}
          layout="fill"
          objectFit="cover"
          priority={visible}
        />
      )}

      <PlatformLogos platforms={platforms} />
    </Container>
  )
}
