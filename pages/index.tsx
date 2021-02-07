import { format } from "date-fns"
import { GetStaticProps } from "next"
import Head from "next/head"

import { MonthCalendar } from "@/components/calendar/month"
import { getReleases } from "@/lib/igdb"
import { ReleasesByDay } from "@/lib/igdb/types"
import { getMonth } from "@/utils"

type Props = {
  month: number
  releases: ReleasesByDay
}

export const getStaticProps: GetStaticProps<
  Props,
  { month: string; year: string }
> = async ({ params }) => {
  const month = getMonth(params?.month) ?? new Date().getMonth() + 1

  return {
    revalidate: 5,
    props: {
      month,
      releases: (await getReleases({ year: 2021, month })) ?? [],
    },
  }
}

const HomePage = ({ month, releases }: Props) => (
  <>
    <Head>
      <title>
        {format(new Date(`2021-${month}-1`), "MMM yyyy")} - Game Release
        Calendar
      </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <MonthCalendar releases={releases} month={month} />
  </>
)

export default HomePage
