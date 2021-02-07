import { format } from "date-fns"
import { GetServerSideProps } from "next"
import Head from "next/head"

import { getMonth, Month } from "@/constants"
import { MonthCalendar } from "@/components/calendar/month"
import { getReleases } from "@/lib/igdb"
import { ReleasesByDay } from "@/lib/igdb/types"


type Props = {
  month: Month
  releases: ReleasesByDay
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { month: string; year: string }
> = async ({ params }) => {
  const month = getMonth(params?.month) ?? new Date().getMonth() + 1

  return {
    props: {
      month,
      releases: (await getReleases({ year: 2021, month })) ?? [],
    },
  }
}

const MonthPage = ({ month, releases }: Props) => (
  <>
    <Head>
      <title>
        {format(new Date(`2021-${Month[month]}-1`), "MMM yyyy")} - Game Release
        Calendar
      </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <MonthCalendar releases={releases} month={month} />
  </>
)

export default MonthPage
