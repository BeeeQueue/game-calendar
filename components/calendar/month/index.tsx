import { getDaysInMonth } from "date-fns"
import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"
import { ReleaseResponse } from "@/lib/igdb"
import { Day } from "@/components/calendar/month/day"

type Props = {
  releases: ReleaseResponse[]
  month: Month
}

export const MonthCalendar = ({ month, releases: allReleases }: Props) => {
  const releasesByDay = allReleases.reduce((accum, release) => {
    const date = new Date(release.date * 1000)
    const day = date.getDay()

    accum[day] ??= []
    accum[day].push(release)

    return accum
  }, [] as Array<ReleaseResponse[]>)

  return (
    <x.main
      container
      display="grid"
      gridTemplateColumns="repeat(7, 1fr)"
      gridAutoRows="auto"
      gap={5}
    >
      {Array.from({ length: getDaysInMonth(month) }).map((_, day) => (
        <Day index={day} releases={releasesByDay[day]} />
      ))}
    </x.main>
  )
}
