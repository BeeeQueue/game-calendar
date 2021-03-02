import { format } from "date-fns"
import { GetStaticProps } from "next"
import Head from "next/head"

import { MonthCalendar } from "@/components/calendar/month"
import { getReleases } from "@/lib/igdb"
import { ReleasesByDay } from "@/lib/igdb/types"
import { getParams } from "@/utils"

type Props = {
  year: number
  month: number
  releases: ReleasesByDay
}

export const getStaticProps: GetStaticProps<
  Props,
  { month: string; year: string }
> = async ({ params }) => {
  const { year, month } = getParams(params)

  return {
    revalidate: 1800,
    props: {
      year,
      month,
      releases: (await getReleases({ year, month })) ?? [],
    },
  }
}

const HomePage = ({ year, month, releases }: Props) => (
  <>
    <Head>
      <title>
        {format(new Date(`${year}-${month}-1`), "MMM yyyy")} - Game Release
        Calendar
      </title>

      <link rel="icon" href="/favicon.ico" />
    </Head>

    <MonthCalendar releases={releases} year={year} month={month} />
  </>
)

export default HomePage
