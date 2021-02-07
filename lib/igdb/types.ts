import { ReleaseDateCategory } from "@/constants"

type Platform = {
  id: number
  name: string
  platform_logo: {
    id: number
    url: string
  }
}
export type ReleaseResponse = {
  id: number
  category: ReleaseDateCategory
  date: number
  platform: Platform
  game: {
    id: number
    name: string
    url: string
    aggregated_rating?: number
    cover?: {
      id: string
      url: string
    }
  }
}
export type Release = Omit<ReleaseResponse, "platform"> & {
  platforms: Platform[]
}