import Container from '@mui/material/Container'
import type { ReactElement } from 'react'

import Header from '@/components/Layout/Header'

import type { NextPageWithLayout } from '@/pages/_app'
import HomeView from '@/views/Home'

const Home: NextPageWithLayout = () => <HomeView />

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 3, backgroundColor: '#fffffc' }}>
        {page}
      </Container>
    </>
  )
}

export default Home
