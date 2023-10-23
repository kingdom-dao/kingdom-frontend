import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
// import { ethers } from 'ethers'

import KingdomTokenAbi from '@/config/abis/KingdomTokenAbi.json'
import { KT_TOKEN_ADDRESS, TOKEN_ERC20 } from '@/config/constants'

const ContractKtBalanceOf = () => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [balance, setBalance] = useState<string>('0')

  const { address } = useAccount()

  const { data, refetch } = useContractRead({
    address: KT_TOKEN_ADDRESS,
    abi: KingdomTokenAbi,
    functionName: 'balanceOf',
    args: [address],
    enabled: enabled,
    onError() {
      return 0
    },
  })

  function formatUnits(bigNumber: bigint, decimals = 18) {
    const divisor = BigInt('10'.padEnd(decimals + 1, '0'))
    const formatted = (
      (BigInt(bigNumber.toString()) * BigInt(10000)) /
      divisor
    ).toString()
    return `${formatted.slice(0, -4)}.${formatted.slice(-4)}`
  }

  useEffect(() => {
    setEnabled(Boolean(address))
  }, [address])

  useEffect(() => {
    ;async () => {
      if (!enabled) return
      await refetch()
    }
  }, [address])

  useEffect(() => {
    let formattedBalance = '0'
    const bigintBalance = data as bigint
    if (bigintBalance === undefined) {
      // Cases of concern for networks
      formattedBalance = '0'
    } else if (bigintBalance.toString() !== '0') {
      formattedBalance = formatUnits(bigintBalance, 18)
    }
    setBalance(formattedBalance)
  }, [data])

  return <>{`${balance.toString()} ${TOKEN_ERC20.SYMBOL}`}</>
}

export default ContractKtBalanceOf
