import Head from "next/head"

import { MonthCalendar } from "@/components/calendar/month"
import { GetStaticProps } from "next"
import { getReleases, Release } from "@/lib/igdb"
import { Month } from "@/constants"

type Props = {
  month: Month
  releases: Release[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const month = new Date().getMonth()

  return {
    revalidate: 5,
    props: {
      month,
      releases: (await getReleases({ year: 2021, month })) ?? [],
    },
  }
}

const Home = ({ month, releases }: Props) => (
  <>
    <Head>
      <title>Game Calendar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <MonthCalendar releases={releases} month={month} />
  </>
)

export default Home
