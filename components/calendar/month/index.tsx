import { getDaysInMonth } from "date-fns"
import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"
import { Release } from "@/lib/igdb"
import { filterDuplicateGames } from "@/utils"

type Props = {
  releases: Release[]
  month: Month
}
export const MonthCalendar = ({ month, releases: allReleases }: Props) => {
  const releasesByDay = allReleases.reduce((accum, release) => {
    const date = new Date(release.date * 1000)
    const day = date.getDay()

    accum[day] ??= []
    accum[day].push(release)

    return accum
  }, [] as Array<Release[]>)

  return (
    <x.main
      container
      display="grid"
      gridTemplateColumns="repeat(7, 1fr)"
      gridAutoRows="auto"
      gap={5}
    >
      {Array.from({ length: getDaysInMonth(month) }).map((_, day) => (
        <x.div
          key={day}
          h={48}
          w={40}
          display="flex"
          flexDirection="column"
          // backgroundImage={`url(https://unsplash.it/160/192?random=${day})`}
        >
          {day + 1}

          <hr />

          {releasesByDay[day] &&
            filterDuplicateGames(releasesByDay[day]).slice(0, 3).map(
              ({ game: { id, name, url, cover } }) => (
                <x.a
                  key={id}
                  display="block"
                  h={1}
                  backgroundImage={cover?.url ? `url(${cover.url})` : undefined}
                  href={url}
                  target="_blank"
                >
                  {name}
                </x.a>
              )
            )}
        </x.div>
      ))}
    </x.main>
  )
}
