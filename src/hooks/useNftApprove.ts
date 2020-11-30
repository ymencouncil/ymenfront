import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {approveNft, getYmenMakerContract, getYmenStakingAddress} from '../sushi/utils'

const useNftApprove = () => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()

  const handleApprove = useCallback(async () => {
    try {
      return await approveNft(getYmenMakerContract(sushi), getYmenStakingAddress(sushi), account);
    } catch (e) {
      return false
    }
  }, [account, sushi, getYmenMakerContract])

  return { onApprove: handleApprove }
}

export default useNftApprove