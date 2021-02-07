import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { x } from "@xstyled/styled-components"

import { getMonth } from "@/utils"

export const Navigation = () => {
  const { push, query } = useRouter()

  const value = Array.isArray(query?.month) ? query?.month[0] : query?.month
  const [month, setMonth] = useState(getMonth(value) ?? new Date().getMonth() + 1)

  useEffect(() => {
    const value = Number(
      Array.isArray(query.month) ? query.month[0] : query.month,
    )
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
        {Array.from({ length: 12 }).map((_, value) => (
          <option value={value + 1}>{value + 1}</option>
        ))}
      </select>
    </x.nav>
  )
}
