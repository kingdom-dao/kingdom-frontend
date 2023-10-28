import { STAKING_PERIOD, STAKING_WEIGHT } from '@/config/constants'

/**
 * Calculate the virtual amount for staking contract.
 * @param {number} amount - The initial amount to stake.
 * @param {number} period - The staking period.
 * @returns {number} - The calculated virtual amount.
 */
export function calculateVirtualAmount(amount: number, period: number): number {
  return (amount * (period + 50)) / 51
}

/**
 * Calculate the end date from the current date based on the given weeks.
 * @param {number} weeks - The number of weeks.
 * @returns {string} - The calculated end date in dd.mm.yy format.
 */
export function calculateEndDateFromCurrentDate(weeks: number): string {
  const currentDate = new Date()
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000 // 1週間のミリ秒
  const endDate = new Date(currentDate.getTime() + weeks * millisecondsPerWeek)

  const day = String(endDate.getDate()).padStart(2, '0')
  const month = String(endDate.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const year = String(endDate.getFullYear()).slice(-2)

  return `${day}.${month}.${year}`
}

/**
 * Calculate the staking weight based on the staking duration in weeks.
 * @param {number} weeks - The number of weeks the user plans to stake for.
 * @returns {string} - The calculated weight, rounded to two decimal places and zero-padded.
 */
export function calculateStakingWeight(weeks: number): string {
  const { MIN: minStakingPeriod, MAX: maxStakingPeriod } = STAKING_PERIOD
  const { MAX: maxWeight } = STAKING_WEIGHT

  let weight: number

  // Special case for 1 week
  if (weeks === 1) {
    weight = 1.0
  } else if (weeks < minStakingPeriod) {
    weight = minStakingPeriod
  } else if (weeks > maxStakingPeriod) {
    weight = maxWeight
  } else {
    const rawWeight =
      1.0 + (maxWeight - 1.0) * ((weeks - 1) / (maxStakingPeriod - 1))
    // Round down to two decimal places
    weight = Math.floor(rawWeight * 100) / 100
  }

  // Convert to string and zero-pad to two decimal places
  return weight.toFixed(2)
}

/**
 * Calculate APR based on the given weight and weeks.
 * @param {number} weight - The weight of the staking.
 * @param {number} weeks - The number of weeks for the staking.
 * @returns {number} - The calculated APR.
 */
export function calculateAPR(weight: number, weeks: number): number {
  const BASE_APR = 119 - STAKING_WEIGHT.MAX * STAKING_PERIOD.MAX

  const apr = BASE_APR + weight * weeks
  return Math.floor(apr * 100) / 100
}
