import { isSameMonth } from "date-fns"
import styled, { css } from "@xstyled/styled-components"

import { Day } from "@/components/calendar/month/day"
import { ReleasesByDay } from "@/lib/igdb/types"

const Calendar = styled.div<{ weeks: number }>`
  height: 100%;
  min-height: 0;
  padding: 6;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, minmax(125px, 180px));
  ${(p) => css`
    grid-template-rows: repeat(${p.weeks}, 1fr);
  `};
  grid-gap: 5;

  transition: opacity 150ms;

  &.before-enter {
    opacity: 0;
  }

  &.entering {
    opacity: 1;
    transition-timing-function: ease-out;
  }

  &.leaving {
    opacity: 0;
  }
`

type Props = {
  releases: ReleasesByDay
  year: number
  month: number
}

export const MonthCalendar = ({ year, month, releases }: Props) => {
  const monthDate = new Date(`${year}-${month}-1`)

  const weeks = Math.ceil(releases.length / 7)

  return (
    <Calendar weeks={weeks}>
      {releases.map(({ date, releases }) => {
        const dateObj = new Date(date)

        return (
          <Day
            key={dateObj.toISOString()}
            date={dateObj}
            releases={releases}
            dim={!isSameMonth(monthDate, dateObj)}
          />
        )
      })}
    </Calendar>
  )
}
