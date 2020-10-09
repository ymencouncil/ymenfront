import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'

const Nft: React.FC = () => {
  return (
    <Page>
      <iframe id="opensea-iframe" title="Embedded OpenSea Marketplace" src="https://opensea.io/assets/ymen-mutant-v2?embed=true" width="100%" height="848px" frameBorder='0' allowFullScreen></iframe>
      {/* <StyledInfo>
        <b>MUTANT Rewards start from block: <StyledLink target="_blank" href="https://etherscan.io/block/countdown/10849177">10849177</StyledLink></b>
        <p>If you can't see your UNI-V2 LP Tokens, withdraw them from the previous contract (located at https://old.ymen.finance ) and then deposit them on the new contract on this page.</p>
        <p>This project is in Beta, use at your own risk. While we have had multiple beta testers and are reasonably sure things are working correctly we advise you to test with small amounts at the start.</p>
      </StyledInfo> */}
    </Page>
  )
}

export default Nft
