import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <FlexDiv>
            <StyledLogoWrapper>
              <Logo />
            </StyledLogoWrapper>
            <Nav />
          </FlexDiv>
          <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  @media (max-width: 400px) {
    width: 50px;
  }
`

const StyledTopBar = styled.div`
  background-color: ${(props) => props.theme.color.blue[1100]};
`
const FlexDiv = styled.div`
  display: flex;
`
const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
    height: 110px;
    flex-direction: column;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  margin-right: 150px;
  @media (max-width: 400px) {
    justify-content: center;
    width: 100%;
    margin-right: 0;
  }
`

export default TopBar
