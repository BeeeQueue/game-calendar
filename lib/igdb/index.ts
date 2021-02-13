import { addDays, lastDayOfMonth, startOfDay, subDays } from "date-fns"
import ms from "ms"

import { config } from "@/config"
import { HttpClient } from "@/lib/http"
import { formatReleaseResponse, getWeekday } from "@/lib/igdb/utils"
import { ReleaseResponse, ReleasesByDay } from "@/lib/igdb/types"
import { Cache as ReleaseCache } from "@/lib/cache"

const getCacheKey = (year: number, month: number) => `${year}-${month}`

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
  month: number
}): Promise<ReleasesByDay | null> => {
  console.log(`Loading releases ${options.year}-${options.month}`)

  let releases: ReleasesByDay | null =
    (await ReleaseCache.get<ReleasesByDay>(
      getCacheKey(options.year, options.month),
    )) ?? null

  if (releases != null) {
    console.log(`Found in cache...`)

    return releases
  }

  const firstDayInMonth = new Date(`${options.year}-${options.month}-1`)
  // getDay gets day of week 0-6 - so we use it as days we need to show before it
  const daysBefore = getWeekday(firstDayInMonth)
  const firstDateToFetch = subDays(firstDayInMonth, daysBefore)

  const lastDayInMonth = lastDayOfMonth(firstDayInMonth)
  // getDay gets day of week 0-6 - so we use it as days we need to show before it
  const daysAfter = 6 - getWeekday(lastDayInMonth)
  const lastDateToFetch = startOfDay(addDays(lastDayInMonth, daysAfter + 1))

  console.log(
    `Calling /release_dates...\n${firstDateToFetch.toISOString()}\n${lastDateToFetch.toISOString()}`,
  )

  const response = await IgdbClient.post<ReleaseResponse[]>("release_dates", {
    body: `
fields
   category
  ,date
  ,platform
    ,platform.name
      ,platform.platform_logo.url
    ,game.name
    ,game.url
    ,game.aggregated_rating
    ,game.hypes
      ,game.cover.url
;
limit 500;
where
    game.cover.url != null
  & game.total_rating != null
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

  releases = formatReleaseResponse(
    response.body,
    firstDateToFetch,
    lastDateToFetch,
  )

  await ReleaseCache.set(getCacheKey(options.year, options.month), releases)

  return releases
}
