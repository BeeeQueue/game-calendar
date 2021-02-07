export const getMonth = (input: number | string | undefined): number | null => {
  const num = Number(input)

  if (isNaN(num)) return null

  return num >= 0 && num <= 12 ? num : null
}
