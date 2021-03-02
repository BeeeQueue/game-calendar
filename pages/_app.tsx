import { AppProps } from "next/app"
import Crossfade from "react-tiny-crossfade"

import styled, {
  defaultTheme,
  Preflight,
  ThemeProvider,
} from "@xstyled/styled-components"

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

const MyApp = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  pageProps,
}: AppProps) => (
  <ThemeProvider theme={theme}>
    <Preflight />

    <Root colorMode="light">
      <Crossfade disableInitialAnimation duration={150}>
        <Component
          /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
          key={`${pageProps.year}-${pageProps.month}`}
          {...pageProps}
        />
      </Crossfade>

      <Navigation />
    </Root>
  </ThemeProvider>
)

export default MyApp
