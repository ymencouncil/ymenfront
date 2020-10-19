import React from 'react'
import styled from 'styled-components'
import telegram from '../../../assets/img/telegram.png'
import twitter from '../../../assets/img/twitter.png'
import medium from '../../../assets/img/medium.png'
import discord from '../../../assets/img/discord.png'
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <FlexDiv>
        <StyledLink
          target="_blank"
          href="https://etherscan.io/address/0x595f13f53667c8071126D6d2Ab499358d967dA39"
        >
          MasterYmen Contract
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://etherscan.io/address/0xd0c59798f986d333554688cd667033d469c2398e"
        >
          YmenFinance Contract
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://etherscan.io/address/0xA663121582725aA0eb8BF20B0F56F1917762e873"
        >
          MutantToken Contract
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://app.uniswap.org/#/swap?outputCurrency=0xd0c59798f986d333554688cd667033d469c2398e"
        >
          Uniswap YMEN-ETH
        </StyledLink>
        <StyledLink
          target="_blank"
          href="https://app.uniswap.org/#/swap?inputCurrency=0xa663121582725aa0eb8bf20b0f56f1917762e873&outputCurrency=0xd0c59798f986d333554688cd667033d469c2398e"
        >
          Uniswap MUTANT-YMEN
        </StyledLink>
      </FlexDiv>
      <FlexDiv>
        <StyledLinkIcon target="_blank" href="https://t.me/ymenfinance">
          <img width="35px" src={telegram} />
        </StyledLinkIcon>
        <StyledLinkIcon target="_blank" href="https://discord.gg/ZVYkKtF">
          <img width="35px" src={discord} />
        </StyledLinkIcon>
        <StyledLinkIcon
          target="_blank"
          href="https://twitter.com/CouncilYmen"
        >
          <img width="35px" src={twitter} />
        </StyledLinkIcon>
        <StyledLinkIcon
          target="_blank"
          href="https://medium.com/@ymencouncil"
        >
          <img width="35px" src={medium} />
        </StyledLinkIcon>
      </FlexDiv>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-right: 150px;
  @media (max-width: 1000px) {
    width: auto;
    margin: 0;
  }
`
const FlexDiv = styled.div`
  display: flex;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[1001]};
  padding-left: ${(props) => props.theme.spacing[4]}px;
  padding-right: ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  max-width: 115px;
  &:hover {
    color: ${(props) => props.theme.color.grey[1000]};
  }
`
const StyledLinkIcon = styled.a`
  color: ${(props) => props.theme.color.grey[1001]};
  padding-left: ${(props) => props.theme.spacing[2]}px;
  padding-right: ${(props) => props.theme.spacing[2]}px;
  text-decoration: none;
  max-width: 115px;
  &:hover {
    color: ${(props) => props.theme.color.grey[1000]};
  }
  @media (max-width: 1000px) {
    margin: 5px 0;
  }
`

export default Nav
