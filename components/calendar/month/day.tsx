import { x } from "@xstyled/styled-components"

import { ReleaseResponse } from "@/lib/igdb"
import { filterDuplicateGames } from "@/utils"

type Props = {
  index: number
  releases: ReleaseResponse[]
}

export const Day = ({ index, releases }: Props) => {
  return (
    <x.div key={index} h={48} w={40} display="flex" flexDirection="column">
      {/* @ts-ignore */}
      <x.div paddingTop={3} paddingBottom={3} fontSize="xl" fontWeight="bold">
        {index + 1}
      </x.div>

      <hr />

      {releases &&
        filterDuplicateGames(releases)
          .slice(0, 2)
          .map(({ game: { id, name, url, cover } }) => (
            <x.a
              key={id}
              display="block"
              h={1}
              background={
                cover?.url ? `url(${cover.url}) center center` : undefined
              }
              href={url}
              target="_blank"
            >
              {name}
            </x.a>
          ))}
    </x.div>
  )
}
