import { addDays } from "date-fns"
import { ComponentPropsWithoutRef } from "react"

import type { Meta, Story } from "@storybook/react"
import styled from "@xstyled/styled-components"

import { releasesFixture } from "@/fixtures/releases"
import { ReleasesByDay } from "@/lib/igdb/types"

import { MonthCalendar } from "./index"

type Args = ComponentPropsWithoutRef<typeof MonthCalendar>

const getReleases = (year: number, month: number): ReleasesByDay => {
  const baseDate = new Date(`${year}-${month}-01`)

  return releasesFixture.map((release, index) => {
    const date = addDays(baseDate, index).getTime()

    return {
      date,
      releases: [{ ...release, date }],
    }
  })
}

export default {
  title: "Components / Month Calendar",
  component: MonthCalendar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    month: 1,
    year: 2021,
  },
} as Meta<Args>

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
`

const story: Story<Args> = (args) => (
  <Container>
    <MonthCalendar
      {...args}
      releases={args.releases ?? getReleases(args.year, args.month)}
    />
  </Container>
)

export const noReleases = story.bind({})
noReleases.args = {
  releases: [],
}

export const someReleases = story.bind({})

export const withPrefixAndSuffixDays = story.bind({})
withPrefixAndSuffixDays.args = {
  month: 4,
  year: 2021,
  releases: [
    { date: new Date("2021-3-29").getTime(), releases: [] },
    { date: new Date("2021-3-30").getTime(), releases: [] },
    { date: new Date("2021-3-31").getTime(), releases: [] },
    ...getReleases(2021, 4),
    ...Array.from({ length: 14 }).map((_, i) => ({
      date: new Date(`2021-4-${17 + i}`).getTime(),
      releases: [],
    })),
    { date: new Date("2021-6-1").getTime(), releases: [] },
    { date: new Date("2021-6-2").getTime(), releases: [] },
  ],
}
