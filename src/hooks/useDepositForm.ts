import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useWaitForTransaction } from 'wagmi'
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
  const [enabled, setEnabled] = useState<boolean>(false)
  const [args, setArgs] = useState({
    weeks: 1,
    amount: '0',
  })

  const { control, handleSubmit, setValue } = useForm<DepositFormSchema>({
    resolver: zodResolver(depositFormSchema),
  })

  const { writeAsync: depositAsync } = useDeposit()
  const { writeAsync: approveAsync } = useApprove()
  const { data: txRecipt, refetch } = useWaitForTransaction({ hash, enabled })

  const watchedInput = useWatch({ control })

  const onSubmit = async (data: DepositFormSchema) => {
    const amount = tokenToMinUnit(data.amount, TOKEN_ERC20.DECIMALS)
    const res = await approveAsync({
      args: [STAKING_CONTRACT_ADDRESS, amount.toString()],
    })
    setHash(res.hash)
    setArgs({
      weeks: data.weeks,
      amount: amount.toString(),
    })
  }

  useEffect(() => {
    if (!hash) return
    void (async () => {
      setEnabled(true)
      await refetch()
    })()
  }, [hash])

  useEffect(() => {
    if (!txRecipt) return
    void (async () => {
      console.info('approve: tx recipt: ', txRecipt)
      await depositAsync({
        args: [KT_TOKEN_ADDRESS, args.weeks, args.amount.toString()],
      })
    })()
  }, [txRecipt])

  return {
    control,
    handleSubmit,
    onSubmit,
    watchedInput,
    setValue,
  }
}

export default useDepositForm
