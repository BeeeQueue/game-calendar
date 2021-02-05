import { Release } from "@/lib/igdb"

export const filterDuplicateGames = (releases: Release[]) => {
  const addedIds: number[] = []

  return releases.filter(({ game: { id } }) => {
    if (addedIds.includes(id)) return false

    addedIds.push(id)
    return true
  })
}
