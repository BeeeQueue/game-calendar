import ms from "ms"

import { config } from "@/config"
import { Month, Platform, ReleaseDateCategory } from "@/constants"
import { HttpClient } from "@/lib/http"

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
      Date.now() + refreshIn
    ).toString()}`
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

export type Release = {
  id: number
  category: ReleaseDateCategory
  date: number
  platform: Platform
  game: {
    id: number
    name: string
    url: string
    platforms: Platform[]
    aggregated_rating?: number
  }
}

export const getReleases = async (options: {
  year: number
  month: Month
}): Promise<Release[] | null> => {
  console.log("Calling /release_dates...")

  const response = await IgdbClient.post<Release[]>("release_dates", {
    body: `
fields 
  id,
  category,
  date,
  platform,
    game.id,
    game.aggregated_rating,
    game.name,
    game.url,
    game.platforms
;
limit 500;
where
  y = ${options.year} &
  m = ${options.month} &
  game.aggregated_rating != null
;
sort date asc;

`.trim(),
  })

  if (response.statusCode > 400) {
    console.error(response.body)
    return null
  }

  return response.body
}
