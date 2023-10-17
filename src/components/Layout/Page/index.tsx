import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { DEFAULT_META, getCustomMeta } from '@/config/constants/meta'

export const PageMeta: React.FC = () => {
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname)

  if (!pageMeta) {
    return null
  }

  const { description } = { ...DEFAULT_META, ...pageMeta }

  return <NextSeo title={pageMeta.title} description={description} />
}

const Page: React.FC = () => {
  return <PageMeta />
}

export default Page
