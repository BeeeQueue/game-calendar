import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useClickAway } from "react-use"

import styled, { x } from "@xstyled/styled-components"

import { PlatformLogos } from "@/components/platform-logos"
import { Release, ReleasesByDay } from "@/lib/igdb/types"

export type Selection = ReleasesByDay[number]

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 100;

  transition: opacity 0.2s;

  &.leaving,
  &.before-enter {
    opacity: 0;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  max-height: 80%;
  width: 650px;

  z-index: 101;

  border-radius: lg;
  overflow-y: auto;

  filter: drop-shadow(2px 6px 5px rgba(0, 0, 0, 0.35));

  & .game:first-of-type {
    border-top-right-radius: 0.5rem;
  }
`

const Game = styled.a`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &:first-child {
    border-top-right-radius: 0.5rem;
  }
`

const PlatformsContainer = styled.div`
  position: relative;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 0 3;

  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.75), transparent);
`

const getGameImage = (release: Release): string | null =>
  release.game.screenshots?.[0]?.url?.replace("t_thumb", "t_screenshot_med") ??
  release.game.cover?.url?.replace("t_thumb", "t_cover_big") ??
  null

type Props = {
  selection: Selection | null
  setSelection: (s: Selection | null) => void
}

export const Details = ({ selection, setSelection }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useClickAway(ref, () => setSelection(null))

  return (
    <Container hidden={selection == null}>
      {selection && (
        <x.div
          position="fixed"
          top={0}
          left={0}
          h="100%"
          w="100%"
          backgroundColor="rgba(0,0,0,0.5)"
          zIndex={100}
        />
      )}

      <Body ref={ref}>
        {selection?.date && (
          <x.div
            display="flex"
            alignItems="center"
            p={2}
            background="gradient-to-b"
            gradientFrom="warm-gray-300-a60"
            gradientTo="warm-gray-300-a80"
            fontSize={42}
            fontWeight={800}
            style={{
              borderTopRightRadius: "0.5rem",
              WebkitTextStroke: "1px black",
              WebkitTextFillColor: "white",
            }}
          >
            {format(new Date(selection.date), "do MMMM yyyy")}
          </x.div>
        )}

        <x.div display="flex" flexDirection="column" w="100%">
          {selection?.releases.map((release) => (
            <Link key={release.game.id} passHref href={release.game.url}>
              <Game>
                <Image
                  unoptimized
                  src={getGameImage(release)!}
                  layout="fill"
                  objectFit="cover"
                />

                <x.div
                  p={3}
                  fontSize={28}
                  fontWeight={800}
                  zIndex={10}
                  background="linear-gradient(90deg, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.5), transparent)"
                  style={{
                    textShadow: "0 2px 5px rgba(0,0,0,0.5)",
                    WebkitTextStroke: "1px black",
                    WebkitTextFillColor: "white",
                  }}
                >
                  {release.game.name}
                </x.div>

                <PlatformsContainer>
                  <PlatformLogos platforms={release.platforms} size={20} />
                </PlatformsContainer>
              </Game>
            </Link>
          ))}
        </x.div>
      </Body>
    </Container>
  )
}
