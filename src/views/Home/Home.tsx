import React from 'react'
import styled from 'styled-components'
import completedLogo from '../../assets/img/completedLogo.png'
import rightPic from '../../assets/img/rightPic.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Image from '../../components/Image/Image'
import Page from '../../components/Page'
import PageHeaderFront from '../../components/PageHeaderFront'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <Container size="lg">
        <StyledParent>
          <StyledChild>
            <Balances />
            <PageHeaderFront
              title="Y-MEN ARE HERE!"
              subtitle="Stake Uniswap LP tokens to collect MUTANT!"
            />
            <StyledButtons>
              <Button text="Unlock Wallet" to="/farms" variant="primary" />
              <Spacer size="lg" />
              <Button text="Enter X-House" to="/farms" variant="tertiary" />
            </StyledButtons>
          </StyledChild>
          <StyledChild>
            <StyledChildImage src={rightPic} />
            <StyledChildImage src={completedLogo} />
          </StyledChild>
        </StyledParent>
      </Container>

      {/* <StyledInfo>
        <b>MUTANT Rewards start from block: <StyledLink target="_blank" href="https://etherscan.io/block/countdown/10849177">10849177</StyledLink></b>
        <p>If you can't see your UNI-V2 LP Tokens, withdraw them from the previous contract (located at https://old.ymen.finance ) and then deposit them on the new contract on this page.</p>
        <p>This project is in Beta, use at your own risk. While we have had multiple beta testers and are reasonably sure things are working correctly we advise you to test with small amounts at the start.</p>
      </StyledInfo> */}
    </Page>
  )
}
const StyledParent = styled.div`
  display: flex;
  width: calc(100% - 100px);
  padding: 0 50px;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  @media (max-width: 400px) {
    width: auto;
    padding: 0;
    flex-direction: column;
  }
`
const StyledChild = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  align-self: center;
  @media (max-width: 400px) {
    width: auto;
    margin-top: 50px;
  }
`

const StyledChildImage = styled.img`
  max-height: calc(50vh - ${(props) => props.theme.topBarSize}px);
  min-height: 230px;
  @media (max-width: 400px) {
    display: none;
  }
`
const StyledButtons = styled.div`
  display: flex;
  align-self: flex-start;
  @media (max-width: 400px) {
    width: auto;
    flex-direction: column;
    button {
      margin-top: 10px;
    }
  }
`
const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[1100]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[1000]};
  }
`

export default Home
