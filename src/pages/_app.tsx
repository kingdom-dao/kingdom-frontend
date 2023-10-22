import '@rainbow-me/rainbowkit/styles.css'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  RainbowKitProvider,
  getDefaultWallets,
  Locale,
} from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Source_Code_Pro } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import type { ReactElement, ReactNode } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { PageMeta } from '@/components/Layout/Page'

import { SEO } from '../../next-seo.config'

import { APP_NAME } from '@/config/constants'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const roboto = Source_Code_Pro({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'block',
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { locale } = useRouter() as { locale: Locale }

  const getLayout = Component.getLayout ?? ((page) => page)

  const theme = createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  })

  const { chains, publicClient } = configureChains(
    [mainnet, sepolia],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string })]
  )

  // https://cloud.walletconnect.com/
  const { connectors } = getDefaultWallets({
    appName: APP_NAME,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    chains,
  })
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  })

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Unlock the power of blockchain for social good with KINGDOM protocol."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <PageMeta />
        <CssBaseline />
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            modalSize="compact"
            chains={chains}
            locale={locale}
          >
            {getLayout(<Component {...pageProps} />)}
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
}
