import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import ContractKtBalanceOf from '@/components/Contract/Kt/BalanceOf'

const depositRows: {
  poolName: string
  unlockData: string
  amountStaked: number
  claimableReward: number
}[] = []
const vestedRows: {
  vestedReward: number
  vestingStart: string
  vestingEnds: number
}[] = []

const ConnectedContent = () => {
  return (
    <>
      <Grid xs={12}>
        <ContractKtBalanceOf />
      </Grid>
      <Grid xs={4}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              KT staked
            </Typography>
            <Typography variant="h5" component="div">
              $0
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              0 KT
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Stake</Button>
            <Button>Unlock</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid xs={4}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Rewards earned
            </Typography>
            <Typography variant="h5" component="div">
              $0
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              0 KT
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Claim all</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid xs={4}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Ready to withdraw
            </Typography>
            <Typography variant="h5" component="div">
              0/$0
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              0KT / 0KT
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Withdraw all</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid xs={12} sx={{ py: 4 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Deposits & Rewards
        </Typography>
        <Typography variant="body2" component="div">
          Your staked DOME tokens can be locked for 1 - 52 weeks. After your
          chosen lock period is finished you can send 100% of your initial
          tokens back to your wallet. Your rewards are calculated and added on a
          daily basis. Claimed rewards enter a vesting period of 12 months from
          the date of claim.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" disableElevation>
            Claim all
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pool name</TableCell>
                <TableCell align="right">Unlock Date</TableCell>
                <TableCell align="right">Amount staked</TableCell>
                <TableCell align="right"> Claimable reward</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {depositRows.map((row) => (
                <TableRow
                  key={row.poolName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.poolName}
                  </TableCell>
                  <TableCell align="right">{row.unlockData}</TableCell>
                  <TableCell align="right">{row.amountStaked}</TableCell>
                  <TableCell align="right">{row.claimableReward}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid xs={12} sx={{ py: 4 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Vested rewards
        </Typography>
        <Typography variant="body2" component="div">
          100% of vested rewards will be available to withdrawal to your wallet
          following a 12 month vesting period from the time of your initial
          reward claim.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" disableElevation>
            Withdraw all
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vested reward</TableCell>
                <TableCell align="right"> Vesting start</TableCell>
                <TableCell align="right">Vesting ends</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vestedRows.map((row) => (
                <TableRow
                  key={row.vestedReward}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.vestedReward}
                  </TableCell>
                  <TableCell align="right">{row.vestingStart}</TableCell>
                  <TableCell align="right">{row.vestingEnds}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  )
}

export default ConnectedContent
