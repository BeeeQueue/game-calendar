import { Fragment } from "react"
import Image from "next/image"

import { Release } from "@/lib/igdb/types"

type Props = {
  release: Pick<Release, "id" | "game">
}

export const Game = ({
  release: {
    id,
    game: { cover },
  },
}: Props) => (
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
