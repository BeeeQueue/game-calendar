import { x } from "@xstyled/styled-components"

import { Release } from "@/lib/igdb"

export const MonthCalendar = ({
  releases: allReleases,
}: {
  releases: Release[]
}) => {
  const releasesByDay = allReleases.reduce((accum, release) => {
    const date = new Date(release.date * 1000)
    const day = date.getDay()

    ;(accum[day] ??= []).push()

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
      {releasesByDay.map((releases, day) => (
        <x.div
          key={day}
          h={48}
          w={40}
          backgroundImage={`https://unsplash.it/160/192?random=${day}`}
        >
          {day + 1}

          {releases.map(({ game: { name } }) => ({ name }))}
        </x.div>
      ))}
    </x.main>
  )
}
