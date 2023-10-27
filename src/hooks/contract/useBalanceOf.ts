import { useState, useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS, TOKEN_ERC20 } from '@/config/constants'
import { minUnitToToken } from '@/utils/token-conversion'

const useBalanceOf = () => {
  const [balance, setBalance] = useState<string>('0')
  const [enabled, setEnabled] = useState<boolean>(false)

  const { address } = useAccount()

  const {
    data: balanceWei,
    refetch,
    isError,
    isLoading,
  } = useContractRead({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'balanceOf',
    args: [address],
    enabled: enabled,
    watch: true,
    onSuccess(data: bigint) {
      return minUnitToToken(data.toString(), TOKEN_ERC20.DECIMALS)
    },
    onError() {
      return BigInt(0)
    },
  })

  useEffect(() => {
    let result = '0'

    if (balanceWei) {
      result = minUnitToToken(balanceWei, TOKEN_ERC20.DECIMALS)
    }

    setBalance(result)
  }, [balanceWei])

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
    balanceWei,
    balance,
    isError,
    isLoading,
  }
}

export default useBalanceOf
