export const tokenToMinUnit = (
  token: number | string,
  decimals: number
): bigint => {
  const multiplier = BigInt('10'.padEnd(decimals + 1, '0'))
  return BigInt((parseFloat(token.toString()) * Number(multiplier)).toString())
}

export const minUnitToToken = (
  minUnit: bigint | string,
  decimals: number
): string => {
  const divisor = BigInt('10'.padEnd(decimals + 1, '0'))
  const formatted = (
    (BigInt(minUnit.toString()) * BigInt(10000)) /
    divisor
  ).toString()
  return `${formatted.slice(0, -4)}.${formatted.slice(-4)}`
}
