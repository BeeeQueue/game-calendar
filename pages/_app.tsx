import * as Fathom from "fathom-client"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
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

export const theme = {
  ...defaultTheme,
}

const App = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  pageProps,
}: AppProps) => {
  const router = useRouter()

  if (process.env.APP_ENV === "production") {
    useEffect(() => {
      // Initialize Fathom when the app loads
      Fathom.load("NZZTHFCK")

      const onRouteChangeComplete = () => {
        Fathom.trackPageview()
      }

      // Record a pageview when route changes
      router.events.on("routeChangeComplete", onRouteChangeComplete)

      // Unassign event listener
      return () => {
        router.events.off("routeChangeComplete", onRouteChangeComplete)
      }
    }, [])
  }

  return (
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
}

export default App
