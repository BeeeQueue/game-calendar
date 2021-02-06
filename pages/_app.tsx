import { AppProps } from "next/app"
import {
  defaultTheme,
  Preflight,
  ThemeProvider,
  x,
} from "@xstyled/styled-components"

import { getBackgroundImage } from "@/styles/utils"

import "@/styles/globals.css"

const theme = {
  ...defaultTheme,
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Preflight />
    <x.div
      h="100%"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="gradient-to-r"
      gradientTo="#0c0c0c"
      gradientFrom="#111"
      {...getBackgroundImage("light", false)}
    >
      <Component {...pageProps} />
    </x.div>
  </ThemeProvider>
)

export default MyApp
