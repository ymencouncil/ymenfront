import React, { useEffect } from 'react'
import chef from '../../assets/img/ymen-logo.svg'

import { useWallet } from 'use-wallet'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
const Farm: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={<img src={chef} height="120" />}
            title="Stake Sushi Tokens & Earn Fees"
            subtitle="0.05% of all SushiSwap trades are rewarded to SUSHI stakers"
          />
          {/* <FarmCards /> */}
          <div>TBD</div>
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onPresentWalletProviderModal}
            text="🔓 Unlock Wallet"
          />
        </div>
      )}
    </Page>
  )
}

export default Farm
