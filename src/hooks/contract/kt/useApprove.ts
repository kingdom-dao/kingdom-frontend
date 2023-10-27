import { useContractWrite } from 'wagmi'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS } from '@/config/constants'

const useApprove = () => {
  const { writeAsync } = useContractWrite({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'approve',
    onSuccess(data) {
      console.log('onSuccess: ', data)
    },
    onError(data) {
      console.log('onError: ', data)
    },
  })

  return {
    writeAsync,
  }
}

export default useApprove
