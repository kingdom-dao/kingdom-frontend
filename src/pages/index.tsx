import Box from '@mui/material/Box'
import type { ReactElement } from 'react'

import Header from '@/components/Layout/Header'

import type { NextPageWithLayout } from '@/pages/_app'
import HomeView from '@/views/Home'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HomeView />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      <Box sx={{ mx: 10, backgroundColor: '#fffffc' }}>{page}</Box>
    </>
  )
}

export default Home
