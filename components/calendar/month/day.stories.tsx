import { ComponentPropsWithoutRef } from "react"

import type { Meta, Story } from "@storybook/react"
import styled from "@xstyled/styled-components"

import { Day } from "@/components/calendar/month/day"
import { releasesFixture } from "@/fixtures/releases"

type Args = ComponentPropsWithoutRef<typeof Day>

export default {
  title: "Components / Month Calendar / Day",
  component: Day,
  parameters: {
    layout: "centered",
  },
} as Meta<Args>

const Container = styled.div`
  height: 200px;
  width: 200px;
  display: grid;
`

const story: Story<Args> = (args) => (
  <Container>
    <Day {...args} />
  </Container>
)

export const noGames = story.bind({})
noGames.args = {
  date: new Date("2021-01-30"),
  releases: [],
}

export const oneGame = story.bind({})
oneGame.args = {
  date: new Date("2021-01-30"),
  releases: releasesFixture.slice(0, 1),
}

export const multipleGames = story.bind({})
multipleGames.args = {
  date: new Date("2021-01-30"),
  releases: releasesFixture.slice(0, 3),
}
