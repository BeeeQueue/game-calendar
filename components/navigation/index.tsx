import { format } from "date-fns"
import { useCallback } from "react"
import { useRouter } from "next/router"
import { x } from "@xstyled/styled-components"

import { getParams } from "@/utils"

export const Navigation = () => {
  const { push, query } = useRouter()

  const { month, year } = getParams(query)

  const currentDate = new Date(`${year}-${month}-1`)

  const changePage = useCallback(
    (modifier: -1 | 1) => () => {
      let newMonth = currentDate.getMonth() + 1 + modifier
      let newYear = currentDate.getFullYear()

      if (newMonth < 1) {
        newMonth = 12
        newYear--
      } else if (newMonth > 12) {
        newMonth = 0
        newYear++
      }

      void push(`/${newYear}/${newMonth}`)
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
      <x.button onClick={changePage(-1)}>&lt;</x.button>

      <x.div>{format(currentDate, "MMMM")}</x.div>

      <x.button onClick={changePage(1)}>&gt;</x.button>
    </x.nav>
  )
}
