import { format } from "date-fns"
import { GetServerSideProps } from "next"
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

export const getServerSideProps: GetServerSideProps<
  Props,
  { month: string; year: string }
> = async ({ params }) => {
  const { year, month } = getParams(params)

  if (year == null || month == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      year,
      month,
      releases: (await getReleases({ year, month })) ?? [],
    },
  }
}

const MonthPage = ({ year, month, releases }: Props) => (
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

export default MonthPage
