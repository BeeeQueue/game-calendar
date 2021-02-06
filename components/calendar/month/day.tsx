import { x } from "@xstyled/styled-components"

import { ReleaseResponse } from "@/lib/igdb"
import { getBackgroundImage } from "@/styles/utils"
import { filterDuplicateGames } from "@/utils"
import { Game } from "./game"

type Props = {
  index: number
  releases: ReleaseResponse[]
}

export const Day = ({ index, releases }: Props) => {
  return (
    <x.div
      key={index}
      position="relative"
      h={48}
      w={40}
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      overflow="hidden"
    >
      <x.div
        position="absolute"
        left="-5%"
        top="-5%"
        h="110%"
        w="110%"
        zIndex={0}
        {...getBackgroundImage("light", true)}
      />

      <x.div p={4} fontSize="xl" fontWeight="bold" zIndex={1}>
        {index + 1}
      </x.div>

      <x.div display="flex" zIndex={2}>
        {releases &&
          filterDuplicateGames(releases)
            .slice(0, 1)
            .map((release) => <Game key={release.id} {...release} />)}
      </x.div>
    </x.div>
  )
}
