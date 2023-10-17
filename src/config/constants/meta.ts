import memoize from 'lodash/memoize'

import type { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'KINGDOM',
  description:
    'Unlock the power of blockchain for social good with KINGDOM protocol.',
}

interface PathList {
  paths: {
    [path: string]: { title: string; basePath?: boolean; description?: string }
  }
  defaultTitleSuffix: string
}

const getPathList = (): PathList => {
  return {
    paths: {
      '/': { title: 'Home' },
    },
    defaultTitleSuffix: 'KINGDOM',
  }
}

export const getCustomMeta = memoize(
  (path: string): PageMeta | null => {
    const pathList = getPathList()
    const pathMetadata = pathList.paths[path]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && {
          description: pathMetadata.description,
        }),
      }
    }
    return null
  },
  (path) => `${path}`
)
