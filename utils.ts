import { ParsedUrlQuery } from "querystring"

import ms from "ms"

type Suffix = "y" | "d" | "h" | "m" | "s" | "ms"
export const s = (input: `${number}${Suffix}`) => Math.round(ms(input) / 1000)

const preloadedImages: string[] = []
export const preloadImage = (src?: string) =>
  new Promise<void>((resolve) => {
    if (src == null || preloadedImages.includes(src)) {
      return resolve()
    }

    let image = new Image()
    image.src = src

    image.addEventListener("load", () => {
      preloadedImages.push(src)
      image.remove()
      image = null as any

      resolve()
    })
  })

const getYear = (input: number | string | undefined): number | null => {
  const num = Number(input)

  if (isNaN(num)) return null

  return num <= 2030 && num >= 1950 ? num : null
}

const getMonth = (input: number | string | undefined): number | null => {
  const num = Number(input)

  if (isNaN(num)) return null

  return num >= 0 && num <= 12 ? num : null
}

export const getParams = (query?: ParsedUrlQuery) => {
  const year = Array.isArray(query?.year) ? query?.year[0] : query?.year
  const month = Array.isArray(query?.month) ? query?.month[0] : query?.month

  return {
    year: getYear(year) ?? new Date().getFullYear(),
    month: getMonth(month) ?? new Date().getMonth() + 1,
  }
}
