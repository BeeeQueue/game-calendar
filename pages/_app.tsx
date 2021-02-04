import { AppProps } from "next/app"
import {
  defaultTheme,
  Preflight,
  ThemeProvider,
  x,
} from "@xstyled/styled-components"

import "@/styles/globals.css"

const theme = {
  ...defaultTheme,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <x.div
        h="100%"
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Component {...pageProps} />
      </x.div>
    </ThemeProvider>
  )
}

export default MyApp
