import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

export const depositFormSchema = z.object({
  weeks: z.number().min(1).max(52),
  amount: z.string().regex(/^\d+(\.\d{1,4})?$/, {
    message: 'Please enter a valid number.',
  }),
})

export type DepositFormSchema = z.infer<typeof depositFormSchema>

const useDepositForm = () => {
  const { control, handleSubmit, setValue } = useForm<DepositFormSchema>({
    resolver: zodResolver(depositFormSchema),
  })

  const watchedInput = useWatch({ control })

  const onSubmit = (data: DepositFormSchema) => {
    console.log('data', data)
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
