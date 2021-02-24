import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useClickAway } from "react-use"
import styled, { x } from "@xstyled/styled-components"

import { ReleasesByDay } from "@/lib/igdb/types"
import { format } from "date-fns"

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
  width: 500px;

  z-index: 101;

  border-radius: lg;
  overflow-y: auto;

  & .game:first-of-type {
    border-top-right-radius: 0.5rem;
  }
`

const Game = styled.div`
  position: relative;
  padding: 3;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &:first-child {
    border-top-right-radius: 0.5rem;
  }
`

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
            <Link href={release.game.url}>
              <Game>
                <Image
                  unoptimized
                  src={
                    release.game.cover?.url?.replace("t_thumb", "t_cover_big")!
                  }
                  layout="fill"
                  objectFit="cover"
                />

                <x.span
                  fontSize={24}
                  fontWeight={800}
                  zIndex={10}
                  style={{
                    WebkitTextStroke: "1px black",
                    WebkitTextFillColor: "white",
                  }}
                >
                  {release.game.name}
                </x.span>
              </Game>
            </Link>
          ))}
        </x.div>
      </Body>
    </Container>
  )
}
