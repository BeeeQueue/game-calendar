import { addDays, differenceInDays, isSameDay } from "date-fns"
import { Release, ReleaseResponse, ReleasesByDay } from "@/lib/igdb/types"

export const getWeekday = (date: Date) => {
  const day = date.getDay()

  return day === 0 ? 6 : day - 1
}

const groupPlatformReleases = (releasesByDay: ReleasesByDay<ReleaseResponse>) =>
  releasesByDay.map(({ date, releases }) => ({
    date,
    releases: releases.reduce((accum, release) => {
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
  }))

const groupReleasesByDay = (
  releases: ReleaseResponse[],
  startDate: Date,
  endDate: Date,
): ReleasesByDay<ReleaseResponse> =>
  Array.from({
    length: differenceInDays(endDate, startDate),
  }).map((_, index) => {
    const dayDate = addDays(startDate, index)

    return {
      date: dayDate.getTime(),
      releases: releases.filter(({ date }) =>
        isSameDay(dayDate, new Date(date * 1000)),
      ),
    }
  })

export const formatReleaseResponse = (
  releases: ReleaseResponse[],
  startDate: Date,
  endDate: Date,
): ReleasesByDay =>
  groupPlatformReleases(groupReleasesByDay(releases, startDate, endDate))
