import { isSameMonth } from "date-fns"
import { useState } from "react"
import Transition from "react-tiny-transition"

import styled, { css } from "@xstyled/styled-components"

import { Details, Selection } from "@/components/calendar/details"
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

export const MonthCalendar = ({
  year,
  month,
  releases: monthsReleases,
}: Props) => {
  const [selected, setSelected] = useState<Selection | null>(null)

  const monthDate = new Date(`${year}-${month}-1`)
  const weeks = Math.ceil(monthsReleases.length / 7)

  return (
    <Calendar weeks={weeks}>
      {monthsReleases.map(({ date, releases }) => {
        const dateObj = new Date(date)

        return (
          <Day
            key={dateObj.toISOString()}
            date={dateObj}
            releases={releases}
            dim={!isSameMonth(monthDate, dateObj)}
            onClick={
              releases.length > 0
                ? () => setSelected({ date, releases })
                : undefined
            }
          />
        )
      })}

      <Transition duration={200}>
        {selected && (
          <Details selection={selected} setSelection={setSelected} />
        )}
      </Transition>
    </Calendar>
  )
}
