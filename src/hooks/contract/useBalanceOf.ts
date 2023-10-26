import { useState, useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS, TOKEN_ERC20 } from '@/config/constants'

const useBalanceOf = () => {
  const [balance, setBalance] = useState<string>('0')
  const [enabled, setEnabled] = useState<boolean>(false)

  const { address } = useAccount()

  const { data, refetch, isError, isLoading } = useContractRead({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'balanceOf',
    args: [address],
    enabled: enabled,
    watch: true,
    onSuccess(data: bigint) {
      const divisor = BigInt('10'.padEnd(TOKEN_ERC20.DECIMALS + 1, '0'))
      const formatted = (
        (BigInt(data.toString()) * BigInt(10000)) /
        divisor
      ).toString()
      return `${formatted.slice(0, -4)}.${formatted.slice(-4)}`
    },
    onError() {
      return BigInt(0)
    },
  })

  useEffect(() => {
    let result = '0'

    if (data) {
      const divisor = BigInt('10'.padEnd(TOKEN_ERC20.DECIMALS + 1, '0'))
      const formatted = (
        (BigInt(data.toString()) * BigInt(10000)) /
        divisor
      ).toString()
      result = `${formatted.slice(0, -4)}.${formatted.slice(-4)}`
    }

    setBalance(result)
  }, [data])

  useEffect(() => {
    setEnabled(Boolean(address))
  }, [address])

  useEffect(() => {
    ;async () => {
      if (!enabled) return
      await refetch()
    }
  }, [address])

  return {
    balance,
    isError,
    isLoading,
  }
}

export default useBalanceOf
