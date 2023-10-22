import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import ConnectedContent from '@/views/Kt/Staking/component/ConnectedContent'
import NotConnectedContent from '@/views/Kt/Staking/component/NotConnectedContent'

const KtStakingView: React.FC = () => {
  const { isConnected } = useAccount()

  const [showContent, setShowContent] = useState<boolean>(false)

  useEffect(() => {
    setShowContent(isConnected)
  }, [isConnected])

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">KINGDOM Token</Typography>
          <Typography color="text.primary">Staking</Typography>
        </Breadcrumbs>
      </Grid>
      {showContent && <ConnectedContent />}
      {!showContent && <NotConnectedContent />}
    </Grid>
  )
}

export default KtStakingView
