import { format, startOfMonth } from "date-fns"
import { useCallback } from "react"
import { useRouter } from "next/router"
import { x } from "@xstyled/styled-components"

import { getMonth } from "@/utils"

export const Navigation = () => {
  const { push, query } = useRouter()

  const value = getMonth(
    Array.isArray(query?.month) ? query?.month[0] : query?.month,
  )

  const currentDate = startOfMonth(
    value ? new Date(`2021-${value}-1`) : new Date(),
  )

  const changeMonth = useCallback(
    (modifier: -1 | 1) => () => {
      let newMonth = (currentDate.getMonth() + 1) + modifier

      if (newMonth < 1) {
        newMonth = 12
      } else if (newMonth > 12) {
        newMonth = 0
      }

      void push(`/2021/${newMonth}`)
    },
    [push],
  )

  return (
    <x.nav
      h={20}
      w="100%"
      marginTop="auto"
      flexShrink={0}
      display="flex"
      justifyContent="center"
      backgroundColor="warm-gray-300-a20"
    >
      <x.button onClick={changeMonth(-1)}>&lt;</x.button>

      <x.div>{format(currentDate, "MMMM")}</x.div>

      <x.button onClick={changeMonth(1)}>&gt;</x.button>
    </x.nav>
  )
}
