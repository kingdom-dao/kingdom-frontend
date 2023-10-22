import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

const NotConnectedContent = () => {
  return (
    <>
      <Grid xs={12} sx={{ textAlign: 'center' }}>
        <Box sx={{ py: 2 }}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 700 }}
          >
            Stake your KINGDOM tokens to earn rewards
          </Typography>
          <Typography variant="h3" component="p" sx={{ fontWeight: 900 }}>
            KINGDOM Staking
          </Typography>
        </Box>
        <Typography variant="body1" component="p">
          We are currently developing a staking system in testnet version.
          <br />
          The network we are using is Ethereum&apos;s Sepolia.
          <br />
          Please connect your wallet if you wish to use the staking feature.
        </Typography>
      </Grid>
    </>
  )
}

export default NotConnectedContent
