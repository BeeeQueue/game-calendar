import Image from "next/image"
import { x } from "@xstyled/styled-components"

import { Release } from "@/lib/igdb/types"
import { PlatformLogos } from "@/components/platform-logos"

type Props = {
  release: Pick<Release, "id" | "game" | "platforms">
}

export const Game = ({
  release: {
    id,
    game: { cover },
    platforms,
  },
}: Props) => (
  <x.div key={id} h="100%" w="100%" display="flex">
    {cover && (
      <Image
        src={`https:${cover.url.replace("t_thumb", "t_cover_big")}`}
        layout="fill"
        objectFit="cover"
      />
    )}

    <PlatformLogos platforms={platforms} />
  </x.div>
)
