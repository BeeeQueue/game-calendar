import { ReactNode, useCallback } from "react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { x } from "@xstyled/styled-components"

import { getParams } from "@/utils"

const Button = ({
  onClick,
  children,
}: {
  children: ReactNode
  onClick: () => void
}) => (
  <x.button
    h={12}
    w={12}
    background="gradient-to-br"
    gradientFrom="warm-gray-100-a80"
    gradientTo="warm-gray-400-a10"
    borderRadius="100%"
    boxShadow="lg"
    fontWeight="900"
    onClick={onClick}
  >
    {children}
  </x.button>
)

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
        newMonth = 1
        newYear++
      }

      void push(`/${newYear}/${newMonth}`)
    },
    [push],
  )

  return (
    <x.nav
      h={16}
      w="100%"
      marginTop="auto"
      flexShrink={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="gradient-to-b"
      gradientFrom="warm-gray-300-a40"
      gradientTo="warm-gray-300-a30"
      boxShadow="0 -2px 15px rgba(0, 0, 0, 0.15)"
    >
      <Button onClick={changePage(-1)}>&lt;</Button>

      <x.div
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        fontSize={30}
        fontWeight="900"
        lineHeight={0.85}
        paddingLeft={8}
        paddingRight={8}
        style={{ textShadow: "0 3px 3px rgba(0, 0, 0, 0.5)" }}
      >
        <x.div
          fontSize={14}
          style={{
            WebkitTextStroke: "0.5px #777",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.75)",
          }}
        >
          {format(currentDate, "yyyy")}
        </x.div>

        <x.div
          minWidth={175}
          textAlign="center"
          style={{
            WebkitTextStroke: "1px #777",
            WebkitTextFillColor: "white",
          }}
        >
          {format(currentDate, "MMMM")}
        </x.div>
      </x.div>

      <Button onClick={changePage(1)}>&gt;</Button>
    </x.nav>
  )
}
