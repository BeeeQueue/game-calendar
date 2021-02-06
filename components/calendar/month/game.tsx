import { Fragment } from "react"
import Image from "next/image"

import { ReleaseResponse } from "@/lib/igdb"

type Props = {
  release: Pick<ReleaseResponse, "id" | "game" | "platform">
}

export const Game = ({
  release: {
    id,
    game: { cover },
  },
}: Props) => {
  return (
    <Fragment key={id}>
      {cover && (
        <Image
          src={`https:${cover.url.replace("t_thumb", "t_cover_big")}`}
          layout="fill"
          objectFit="cover"
        />
      )}
    </Fragment>
  )
}
