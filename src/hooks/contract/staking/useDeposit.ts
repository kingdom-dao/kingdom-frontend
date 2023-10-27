import { useContractWrite } from 'wagmi'

import StakingAbi from '@/config/abis/StakingAbi.json'
import { STAKING_CONTRACT_ADDRESS } from '@/config/constants'

const useDeposit = () => {
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingAbi,
    functionName: 'deposit',
    onSuccess(data) {
      console.log('onSuccess: ', data)
    },
    onError(data) {
      console.log('onError: ', data)
    },
  })

  return {
    write,
    writeAsync,
    data,
    isLoading,
    isSuccess,
  }
}

export default useDeposit
