import styled, {
  defaultTheme,
  Preflight,
  ThemeProvider,
} from "@xstyled/styled-components"
import { AppProps } from "next/app"
import Crossfade from "react-tiny-crossfade"

import { Navigation } from "@/components/navigation"
import { backgroundImage } from "@/styles/utils"

import "@/styles/globals.css"

const Root = styled(Crossfade)`
  height: 100vh !important;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  ${backgroundImage};

  & > div {
    height: 100% !important;
  }
`

const theme = {
  ...defaultTheme,
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Preflight />
    <Root colorMode="light">
      <Crossfade disableInitialAnimation duration={150}>
        <Component
          key={`${pageProps.year}-${pageProps.month}`}
          {...pageProps}
        />
      </Crossfade>

      <Navigation />
    </Root>
  </ThemeProvider>
)

export default MyApp
