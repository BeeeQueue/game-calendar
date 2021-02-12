import { Platform, Release } from "@/lib/igdb/types"
import { memo } from "react"
import { x } from "@xstyled/styled-components"

const getPlatformLogo = ({ id, name }: Platform): string | null => {
  if (name.toLowerCase().includes("xbox")) {
    return "xbox"
  }

  switch (id) {
    case 1:
      return "apple"
    case 3:
      return "linux"
    case 6:
      return "windows"

    case 167:
      return "playstation5"
    case 48:
      return "playstation4"
    case 46:
      return "playstationvita"

    case 130:
      return "switch"

    case 170:
      return "stadia"

    case 34:
      return "android"
    case 39:
      return "ios"

    // case 163:
    //   return "steamvr"
    // case unknown:
    //   return "playstationvr"

    default:
      return null
  }
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
        backgroundColor="warm-gray-900-a40"
      >
        {platformNames.filter(Boolean).map((name) => (
          <x.img
            key={name}
            h={4}
            w={name!.includes("playstation") ? 6 : undefined}
            objectFit="cover"
            marginRight={1}
            fill="white"
            color="white"
            style={{
              filter:
                "invert(1) drop-shadow(0 0 2px black) drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
            src={`/img/platforms/${name}.svg`}
          />
        ))}
      </x.div>
    )
  },
)
