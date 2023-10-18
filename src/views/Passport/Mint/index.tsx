import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

const PassportMintView: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Mint Passport</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid xs={12}>
        <Typography variant="body1" component="a" gutterBottom>
          Comming soon...
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PassportMintView
