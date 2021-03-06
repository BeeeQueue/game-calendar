import { ComponentPropsWithoutRef } from "react"

import type { Meta, Story } from "@storybook/react"
import styled from "@xstyled/styled-components"

import { releasesFixture } from "@/fixtures/releases"
import { backgroundImage } from "@/styles/utils"

import { Details } from "./details"

type Args = ComponentPropsWithoutRef<typeof Details>

export default {
  title: "Components / Details",
  component: Details,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    setSelection: () => null,
  },
} as Meta<Args>

const Container = styled.div`
  height: 100vh;
  ${backgroundImage};
`

const story: Story<Args> = (args) => (
  <Container>
    <Details {...args} />
  </Container>
)

export const noGames = story.bind({})
noGames.args = {
  selection: {
    date: new Date("2021-01-30").getTime(),
    releases: [],
  },
}

export const oneGame = story.bind({})
oneGame.args = {
  selection: {
    date: new Date("2021-01-30").getTime(),
    releases: releasesFixture.slice(0, 1),
  },
}

export const multipleGames = story.bind({})
multipleGames.args = {
  selection: {
    date: new Date("2021-01-30").getTime(),
    releases: releasesFixture.slice(0, 3),
  },
}

export const tooManyGames = story.bind({})
tooManyGames.args = {
  selection: {
    date: new Date("2021-01-30").getTime(),
    releases: releasesFixture.slice(0, 8),
  },
}
