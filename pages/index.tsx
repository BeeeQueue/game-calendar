import Head from "next/head"
import { x } from "@xstyled/styled-components"

const Home = () => (
  <>
    <Head>
      <title>Game Calendar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <x.main container>
      <x.button>Test</x.button>
    </x.main>
  </>
)

export default Home
