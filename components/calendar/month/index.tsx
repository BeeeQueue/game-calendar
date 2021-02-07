import { x } from "@xstyled/styled-components"

import { Day } from "@/components/calendar/month/day"
import { ReleasesByDay } from "@/lib/igdb/types"

type Props = {
  releases: ReleasesByDay
  month: number
}

export const MonthCalendar = ({ releases }: Props) => {
  const weeks = Math.ceil(releases.length / 7)

  return (
    <x.main
      container
      minHeight={0}
      paddingTop={6}
      // @ts-ignore
      paddingBottom={6}
      display="grid"
      gridTemplateColumns="repeat(7, minmax(125px, 180px))"
      gridTemplateRows={`repeat(${weeks}, 1fr)`}
      gap={5}
    >
      {releases.map(({ date, releases }) => (
        <Day key={date} date={new Date(date)} releases={releases} />
      ))}
    </x.main>
  )
}
