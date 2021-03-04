import type { Parameters, DecoratorFn } from "@storybook/react"
import { ThemeProvider } from "@xstyled/styled-components"

import { theme } from "@/pages/_app"

import "@/styles/globals.css"

export const parameters: Parameters = {}

export const decorators: DecoratorFn[] = [
  (s) => <ThemeProvider theme={theme}>{s()}</ThemeProvider>,
]
