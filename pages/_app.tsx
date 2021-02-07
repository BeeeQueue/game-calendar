import { AppProps } from "next/app"
import styled, {
  defaultTheme,
  Preflight,
  ThemeProvider,
} from "@xstyled/styled-components"

import { Navigation } from "@/components/navigation"
import { backgroundImage } from "@/styles/utils"

import "@/styles/globals.css"

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  ${backgroundImage};
`

const theme = {
  ...defaultTheme,
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Preflight />
    <Root colorMode="light">
      <Component {...pageProps} />

      <Navigation />
    </Root>
  </ThemeProvider>
)

export default MyApp
