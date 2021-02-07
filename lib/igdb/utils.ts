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

const groupReleasesByDay = (releases: ReleaseResponse[]) =>
  releases.reduce((accum, release) => {
    const date = new Date(release.date * 1000)
    const day = date.getDay()

    accum[day] ??= []
    accum[day].push(release)

    return accum
  }, [] as Array<ReleaseResponse[]>)

export const formatReleaseResponse = (
  releases: ReleaseResponse[],
): Release[][] => groupPlatformReleases(groupReleasesByDay(releases))
