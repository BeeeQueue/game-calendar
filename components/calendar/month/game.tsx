import { x } from "@xstyled/styled-components"

import { ReleaseResponse } from "@/lib/igdb"

type Props = Pick<ReleaseResponse, "id" | "game" | "platform">

export const Game = ({ id, game: { cover, url } }: Props) => {
  return (
    <x.a
      key={id}
      position="relative"
      display="block"
      h={1}
      href={url}
      target="_blank"
    >
      {cover && (
        <x.img
          src={cover.url.replace("t_thumb", "t_cover_big")}
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      )}
    </x.a>
  )
}
