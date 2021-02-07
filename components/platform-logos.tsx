import { Platform, Release } from "@/lib/igdb/types"
import { memo } from "react"
import { x } from "@xstyled/styled-components"

const getPlatformLogo = ({ id, name, platform_logo: logo }: Platform) => {
  if (id === 3) {
    return "linux"
  }
  if (id === 6) {
    return "windows"
  }
  if (id === 14) {
    return "apple"
  }

  if (name.toLowerCase().includes("xbox")) {
    return "xbox"
  }

  if (id === 167) {
    return "playstation5"
  }
  if (id === 48) {
    return "playstation4"
  }
  if (id === 46) {
    return "playstationvita"
  }

  if (id === 130) {
    return "switch"
  }

  if (id === 170) {
    return "stadia"
  }

  // if (id === 163) {
  //   return "steamvr"
  // }

  if (id === 34) {
    return "android"
  }
  if (id === 39) {
    return "ios"
  }

  return logo?.url ?? null
}

export const PlatformLogos = memo<Pick<Release, "platforms">>(
  ({ platforms }) => {
    const platformNames = Array.from(new Set(platforms.map(getPlatformLogo)))

    return (
      <x.div
        display="flex"
        position="relative"
        w="100%"
        p={1}
        marginTop="auto"
        backgroundColor="warm-gray-900-a60"
      >
        {platformNames.filter(Boolean).map((name) => (
          <x.img
            h={4}
            w={name!.includes("playstation") ? 6 : undefined}
            objectFit="cover"
            marginRight={1}
            fill="white"
            color="white"
            style={{ filter: "invert(1)" }}
            src={`/img/platforms/${name}.svg`}
          />
        ))}
      </x.div>
    )
  },
)
