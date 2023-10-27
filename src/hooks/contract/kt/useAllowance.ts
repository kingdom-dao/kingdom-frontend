import { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS, STAKING_CONTRACT_ADDRESS } from '@/config/constants'

const useAllowance = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [enabled, setEnabled] = useState<boolean>(false)

  const { address } = useAccount()

  const { data, refetch, isError, isLoading } = useContractRead({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'allowance',
    args: [address, STAKING_CONTRACT_ADDRESS],
    enabled: enabled,
    watch: true,
    onSuccess(data) {
      console.log('onSuccess: ', data)
    },
    onError(data) {
      console.log('onError: ', data)
    },
  })

  return {
    data,
    refetch,
    isError,
    isLoading,
  }
}

export default useAllowance
