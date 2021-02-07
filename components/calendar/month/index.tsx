import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"
import { Day } from "@/components/calendar/month/day"
import { Release } from "@/lib/igdb/types"

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
      {releases.map((releases, index) => (
        <Day key={index} date={} releases={releases[day]} />
      ))}
    </x.main>
  )
}
