import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

export const depositFormSchema = z.object({
  weeks: z.number().min(1).max(52),
  amount: z.number().min(0),
})

export type DepositFormSchema = z.infer<typeof depositFormSchema>

const useDepositForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DepositFormSchema>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: undefined,
    resolver: zodResolver(depositFormSchema),
  })

  const watchedInput = useWatch({ control })
  console.log('errors: ', errors)
  console.log('watchedInput: ', watchedInput)

  const onSubmit = (data: DepositFormSchema) => {
    // zodの値変換+型チェックを通過した値
    console.log('data', data)
  }

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
    },
  }
}

export default useDepositForm
