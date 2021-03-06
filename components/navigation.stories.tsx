import { ComponentPropsWithoutRef } from "react"
import { withNextRouter } from "storybook-addon-next-router"

import type { Meta, Story } from "@storybook/react"
import styled from "@xstyled/styled-components"

import { backgroundImage } from "@/styles/utils"

import { Navigation } from "./navigation"

type Args = ComponentPropsWithoutRef<typeof Navigation>

export default {
  title: "Components / Navigation",
  component: Navigation,
  decorators: [withNextRouter],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    month: 1,
    year: 2021,
  },
} as Meta<Args>

const Container = styled.div`
  height: 100vh;
  ${backgroundImage};
`

const story: Story<Args> = () => (
  <Container>
    <Navigation />
  </Container>
)

export const main = story.bind({})
main.args = {
  releases: [],
}
