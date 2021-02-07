import { getDaysInMonth } from "date-fns"
import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"
import { Release } from "@/lib/igdb"
import { Day } from "@/components/calendar/month/day"

type Props = {
  releases: Release[][]
  month: Month
}

export const MonthCalendar = ({ month, releases }: Props) => {
  return (
    <x.main
      container
      h="100%"
      display="grid"
      gridTemplateColumns="repeat(7, minmax(125px, 180px))"
      gridTemplateRows="repeat(6, minmax(125px, 1fr))"
      gap={5}
    >
      {Array.from({ length: getDaysInMonth(month) }).map((_, day) => (
        <Day key={day} index={day} releases={releases[day]} />
      ))}
    </x.main>
  )
}
