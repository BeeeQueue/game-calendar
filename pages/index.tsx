import Head from "next/head"

import { MonthCalendar } from "@/components/calendar/month"
import { GetStaticProps } from "next"
import { getReleases, Release } from "@/lib/igdb"
import { Month } from "@/constants"

type Props = {
  releases: Release[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    revalidate: 5,
    props: {
      releases:
        (await getReleases({ year: 2021, month: Month.February })) ?? [],
    },
  }
}

const Home = ({ releases }: Props) => (
  <>
    <Head>
      <title>Game Calendar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <MonthCalendar releases={releases} />
  </>
)

export default Home
