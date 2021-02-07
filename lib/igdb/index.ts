import { addDays, endOfDay, lastDayOfMonth, subDays } from "date-fns"
import ms from "ms"
import Cache from "node-cache"

import { config } from "@/config"
import { Month } from "@/constants"
import { HttpClient } from "@/lib/http"
import { formatReleaseResponse } from "@/lib/igdb/utils"
import { Release, ReleaseResponse } from "@/lib/igdb/types"

const ReleaseCache = new Cache({
  stdTTL: 12 * 60 * 60,
})
const getCacheKey = (year: number, month: Month) => `${year}-${month}`

let token: string | null = process.env.TOKEN || null

const refreshToken = async () => {
  const response = await HttpClient.post<{
    access_token: string
    expires_in: number
    token_type: "bearer"
  }>("https://id.twitch.tv/oauth2/token", {
    searchParams: {
      client_id: config.IGDB_CLIENT_ID,
      client_secret: config.IGDB_SECRET,
      grant_type: "client_credentials",
    },
  })

  token = response.body.access_token
  const refreshIn = ms("30d")

  setTimeout(() => {
    token = null
  }, refreshIn)

  console.log(
    `Got new token, expires in ${ms(refreshIn)} - ${new Date(
      Date.now() + refreshIn,
    ).toString()}`,
  )
}

const getToken = async () => {
  if (token == null) {
    await refreshToken()
  }

  return token
}

export const IgdbClient = HttpClient.extend({
  prefixUrl: "https://api.igdb.com/v4",
  headers: {
    "Content-Type": "text/plain",
    "Client-ID": config.IGDB_CLIENT_ID,
  },
  hooks: {
    beforeRequest: [
      async (options) => {
        options.headers.Authorization = `Bearer ${await getToken()}`
      },
    ],
  },
})

export const getReleases = async (options: {
  year: number
  month: Month
}): Promise<Release[][] | null> => {
  console.log(`Loading releases ${options.year}-${options.month}`)

  if (ReleaseCache.has(getCacheKey(options.year, options.month))) {
    console.log(`Found in cache...`)

    return ReleaseCache.get<Release[][]>(
      getCacheKey(options.year, options.month),
    )!
  }

  console.log("Calling /release_dates...")

  const firstDayInMonth = new Date(`${options.year}-${options.month}-1`)
  // getDay gets day of week 0-6 - so we use it as days we need to show before it
  const daysBefore = firstDayInMonth.getDay()
  const firstDateToFetch = subDays(firstDayInMonth, daysBefore)

  const lastDayInMonth = lastDayOfMonth(firstDayInMonth)
  // getDay gets day of week 0-6 - so we use it as days we need to show before it
  const daysAfter = 6 - lastDayInMonth.getDay()
  const lastDateToFetch = endOfDay(addDays(lastDayInMonth, daysAfter))

  const response = await IgdbClient.post<ReleaseResponse[]>("release_dates", {
    body: `
fields
   category
  ,date
  ,platform
    ,platform.name
      ,platform.platform_logo.url
    ,game.aggregated_rating
    ,game.name
    ,game.url
      ,game.cover.url
;
limit 500;
where
    game.aggregated_rating != null
  & date >= ${Math.round(firstDateToFetch.getTime() / 1000)}
  & date <= ${Math.round(lastDateToFetch.getTime() / 1000)}
;
sort date asc;

`.trim(),
  })

  if (response.statusCode > 400) {
    console.error(response.body)
    return null
  }

  const releases = formatReleaseResponse(
    response.body,
    firstDateToFetch,
    lastDateToFetch,
  )

  ReleaseCache.set(getCacheKey(options.year, options.month), releases)

  return releases
}
