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

//import BalanceOf from '@/components/Contract/Kt/BalanceOf'

import { TOKEN_ERC20 } from '@/config/constants'
import useBalanceOf from '@/hooks/contract/useBalanceOf'

export interface DepositDialogProps {
  open: boolean
  onClose: () => void
}

const MIN_WEEKS = 1
const MAX_WEEKS = 52

function valuetext(value: number) {
  return `${value} weeks`
}

const DepositDialog = (props: DepositDialogProps) => {
  const { onClose, open } = props

  const [weeks, setWeeks] = useState<number>(0)

  const { balance } = useBalanceOf()

  const handleClose = () => {
    onClose()
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setWeeks(newValue as number)
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>{TOKEN_ERC20.NAME}</DialogTitle>
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
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" component="div">
                Staking end date: 23.04.23
              </Typography>
              <Typography variant="body2" component="div">
                Weight 2.00
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Slider
                id="lock-weeks-input"
                max={MAX_WEEKS}
                min={MIN_WEEKS}
                defaultValue={MIN_WEEKS}
                value={weeks}
                onChange={handleChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="on"
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" component="div">
                Balance: {balance ? balance.toString() : '0'}{' '}
                {TOKEN_ERC20.SYMBOL}
              </Typography>
              <Typography variant="body2" component="div">
                Est. APR. 149%
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                id="lock-amount-input"
                label="Lock amount"
                variant="outlined"
                defaultValue={0}
                fullWidth
                InputProps={{
                  endAdornment: 'KT',
                }}
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Rewards claiming period: 1 day
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Rewards vesting period: 12 months
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                Be aware of the risks associated with staking contracts. You
                assume all the responsibility.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disableElevation>
          Stake
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DepositDialog
