export const APP_NAME = 'KINGDOM'

export const KT_TOKEN_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_KT_ADDRESS as `0x${string}`

export const STAKING_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_STAKING_ADDRESS as `0x${string}`

export const LINKS = {
  WHITEPAPER: 'https://kingdom-3.gitbook.io/kingdom/',
}

export const TOKEN_ERC20 = {
  NAME: 'Kingdom Token',
  SYMBOL: 'KT',
}
