import { addDays, differenceInDays, isSameDay } from "date-fns"
import { ReleaseResponse, Release } from "@/lib/igdb"

const groupPlatformReleases = (
  releasesByDay: Array<ReleaseResponse[]>,
): Release[][] =>
  releasesByDay.map((day) =>
    day.reduce((accum, release) => {
      const existingIndex = accum.findIndex(
        ({ game }) => game.id === release.game.id,
      )

      if (existingIndex < 0) {
        return [
          ...accum,
          {
            ...release,
            platforms: [release.platform],
          },
        ]
      }

      accum[existingIndex].platforms.push(release.platform)

      return accum
    }, [] as Release[]),
  )

const groupReleasesByDay = (
  releases: ReleaseResponse[],
  startDate: Date,
  endDate: Date,
): Array<ReleaseResponse[]> =>
  Array.from({
    length: differenceInDays(endDate, startDate),
  }).map((_, index) => {
    const day = addDays(startDate, index)

    return releases.filter(({ date }) => isSameDay(day, new Date(date * 1000)))
  })

export const formatReleaseResponse = (
  releases: ReleaseResponse[],
  startDate: Date,
  endDate: Date,
): Release[][] =>
  groupPlatformReleases(groupReleasesByDay(releases, startDate, endDate))
