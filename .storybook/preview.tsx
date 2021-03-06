import type { DecoratorFn } from "@storybook/react"
import timemachine from "timemachine"
import { ThemeProvider } from "@xstyled/styled-components"

import { theme } from "@/pages/_app"

import "@/styles/globals.css"

type OriginalParameters<T extends (...args: any) => any> = Parameters<T>

declare module "@storybook/addons" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Parameters {
    timemachine?: OriginalParameters<typeof timemachine["config"]>[0]
  }
}

const TimeResetDecorator: DecoratorFn = (s, context) => {
  timemachine.config({
    ...context.parameters.timemachine,
    dateString: "2020-03-01",
    tick: true,
  })

  return s()
}

export const decorators: DecoratorFn[] = [
  TimeResetDecorator,
  (s) => <ThemeProvider theme={theme}>{s()}</ThemeProvider>,
]
