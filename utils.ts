import { ParsedUrlQuery } from "querystring"

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
