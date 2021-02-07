import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"
import { Day } from "@/components/calendar/month/day"
import { ReleasesByDay } from "@/lib/igdb/types"

type Props = {
  releases: ReleasesByDay
  month: Month
}

export const MonthCalendar = ({ releases }: Props) => {
  const weeks = Math.ceil(releases.length / 7)

  return (
    <x.main
      container
      h="100%"
      display="grid"
      gridTemplateColumns="repeat(7, minmax(125px, 180px))"
      gridTemplateRows={`repeat(${weeks}, minmax(125px, 1fr))`}
      gap={5}
    >
      {releases.map(({ date, releases }) => (
        <Day key={date} date={new Date(date)} releases={releases} />
      ))}
    </x.main>
  )
}
