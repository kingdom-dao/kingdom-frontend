import { useContractWrite } from 'wagmi'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS } from '@/config/constants'

const useApprove = () => {
  const { writeAsync, isLoading, isSuccess } = useContractWrite({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'approve',
    onSuccess(data) {
      console.info('approve: onSuccess: ', `hash=${data.hash}`)
    },
    onError(data) {
      console.info('approve: onError: ', data)
    },
  })

  return {
    writeAsync,
    isLoading,
    isSuccess,
  }
}

export default useApprove
