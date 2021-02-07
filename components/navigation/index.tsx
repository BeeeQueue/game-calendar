import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { x } from "@xstyled/styled-components"

import { Month } from "@/constants"

const months = Object.values(Month).filter((v) => typeof v === "string")

export const Navigation = () => {
  const { push, query } = useRouter()

  const [month, setMonth] = useState<Month>(new Date().getMonth() + 1)

  useEffect(() => {
    const value = Number(Array.isArray(query.month) ? query.month[0] : query.month)
    if (isNaN(value)) return

    setMonth(value)
  }, [query.month])

  const updateParams = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      void push(`/2021/${Number(e.currentTarget.value)}`)
    },
    [push],
  )

  return (
    <x.nav p={4} display="flex" justifyContent="center">
      <select onChange={updateParams} value={month}>
        {months.map((label) => (
          <option value={Month[label as Month]}>{label}</option>
        ))}
      </select>
    </x.nav>
  )
}
