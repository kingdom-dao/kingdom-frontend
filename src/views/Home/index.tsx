import Breadcrumbs from '@mui/material/Breadcrumbs'
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
      <Grid xs={6}>
        <p>hoge</p>
      </Grid>
      <Grid xs={6}>
        <p>hoge</p>
      </Grid>
    </Grid>
  )
}

export default HomeView
