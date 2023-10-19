import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

const HomeView: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Home</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid xs={4}>
        <Card>
          <CardContent>TokenHolders</CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card>
          <CardContent>NFT Holders</CardContent>
        </Card>
      </Grid>
      <Grid xs={4}>
        <Card>
          <CardContent>NFT Salses</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HomeView
