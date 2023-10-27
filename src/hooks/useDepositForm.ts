import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
// import { useWaitForTransaction } from 'wagmi'
import { z } from 'zod'

import {
  KT_TOKEN_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
  TOKEN_ERC20,
} from '@/config/constants'
// import useAllowance from '@/hooks/contract/kt/useAllowance'
import useApprove from '@/hooks/contract/kt/useApprove'
import useDeposit from '@/hooks/contract/staking/useDeposit'
import { tokenToMinUnit } from '@/utils/token-conversion'

export const depositFormSchema = z.object({
  weeks: z.number().min(1).max(52),
  amount: z.string().regex(/^\d+(\.\d{1,4})?$/, {
    message: 'Please enter a valid number.',
  }),
})

export type DepositFormSchema = z.infer<typeof depositFormSchema>

const useDepositForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
  const { control, handleSubmit, setValue } = useForm<DepositFormSchema>({
    resolver: zodResolver(depositFormSchema),
  })

  const { writeAsync: depositAsync } = useDeposit()
  const { writeAsync: approveAsync } = useApprove()
  // const { data: txHash } = useWaitForTransaction({ hash })

  const watchedInput = useWatch({ control })

  const onSubmit = async (data: DepositFormSchema) => {
    const amount = tokenToMinUnit(data.amount, TOKEN_ERC20.DECIMALS)
    console.log('amount: ', amount)

    const approveResponse = await approveAsync({
      args: [STAKING_CONTRACT_ADDRESS, amount.toString()],
    })

    console.log('approve hash: ', approveResponse.hash)
    setHash(approveResponse.hash)

    const depositResponse = await depositAsync({
      args: [KT_TOKEN_ADDRESS, data.weeks, amount.toString()],
    })

    console.log('deposit hash: ', depositResponse.hash)
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    watchedInput,
    setValue,
  }
}

export default useDepositForm
