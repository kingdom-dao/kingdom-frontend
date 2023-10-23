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

import { TOKEN_ERC20 } from '@/config/constants'

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
            <Typography variant="body2" component="p">
              Staking end date: 23.04.23
            </Typography>
            <Typography variant="body2" component="p">
              Weight 2.00
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Slider
            defaultValue={MIN_WEEKS}
            value={weeks}
            max={MAX_WEEKS}
            min={MIN_WEEKS}
            onChange={handleChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
          />
        </Box>
        <Box>
          <Typography variant="body2">Balance: 108.22122</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            id="lock-amount-input"
            label="Lock amount"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="body2">Est. APR. 149%</Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            Rewards claiming period: 1 day
          </Typography>
          <Typography variant="body2">
            Rewards vesting period: 12 months
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            Be aware of the risks associated with staking contracts. You assume
            all the responsibility.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Enable</Button>
        <Button>Stake</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DepositDialog
