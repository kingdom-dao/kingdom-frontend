/* eslint-disable @typescript-eslint/no-misused-promises */

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { STAKING_PERIOD, TOKEN_ERC20 } from '@/config/constants'
import useBalanceOf from '@/hooks/contract/kt/useBalanceOf'
import useDepositForm from '@/hooks/useDepositForm'
import { minUnitToToken } from '@/utils/token-conversion'

export interface DepositDialogProps {
  open: boolean
  onClose: () => void
}

const DepositDialog = (props: DepositDialogProps) => {
  const { onClose, open } = props

  const [weeks, setWeeks] = useState<number>(0)

  const { balanceWei, balance } = useBalanceOf()

  const { control, handleSubmit, onSubmit, setValue, watchedInput, isLoading } =
    useDepositForm()

  const handleClose = () => {
    onClose()
  }

  const setAmount = (percent: number) => {
    if (!balanceWei) return
    const amount = (balanceWei * BigInt(percent)) / BigInt(100)
    setValue('amount', minUnitToToken(amount, TOKEN_ERC20.DECIMALS))
  }

  useEffect(() => {
    setWeeks(watchedInput.weeks || 1)
  }, [watchedInput.weeks])

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>{TOKEN_ERC20.NAME}</DialogTitle>
      {!isLoading && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ fontWeight: 'bold' }}
                >
                  Lock for {weeks} weeks
                </Typography>
              </Grid>
              <Grid xs={12} sx={{ pt: 4, px: 2 }}>
                <Controller
                  name="weeks"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      min={STAKING_PERIOD.MIN}
                      max={STAKING_PERIOD.MAX}
                      valueLabelDisplay="on"
                    />
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" component="div">
                    Balance: {balance ? balance.toString() : '0'}{' '}
                    {TOKEN_ERC20.SYMBOL}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue="0"
                  render={({ field, formState: { errors } }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      autoComplete="off"
                      fullWidth
                      error={errors.amount ? true : false}
                      helperText={errors.amount?.message as string}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} textAlign="right">
                <Button
                  variant="outlined"
                  disableElevation
                  sx={{ mr: 0.5 }}
                  onClick={() => setAmount(25)}
                >
                  25%
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  sx={{ mr: 0.5 }}
                  onClick={() => setAmount(50)}
                >
                  50%
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  sx={{ mr: 0.5 }}
                  onClick={() => setAmount(75)}
                >
                  75%
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  onClick={() => setAmount(100)}
                >
                  MAX
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" disableElevation>
              Stake
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  )
}

export default DepositDialog
