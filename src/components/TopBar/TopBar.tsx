import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import HamburgerMenu from 'react-hamburger-menu'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const { color } = useContext(ThemeContext)

  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <FlexDiv>
            <StyledLogoWrapper>
              <Logo />
            </StyledLogoWrapper>
            <Nav onPresentMobileMenu={onPresentMobileMenu} />
            <StyledAccountButtonWrapper>
              <AccountButton />
            </StyledAccountButtonWrapper>
            <StyledHamburgerWrapper>
              <HamburgerMenu
                isOpen={false}
                menuClicked={onPresentMobileMenu}
                color={color.red[1100]}
              ></HamburgerMenu>
            </StyledHamburgerWrapper>
          </FlexDiv>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
`

const StyledTopBar = styled.div`
  background-color: ${(props) => props.theme.color.blue[1100]};
  position: fixed;
  width: 100%;
  z-index: 1;
`
const FlexDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 800px) {
    justify-content: center;
    width: auto;
    flex-direction: column;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 800px) {
    justify-content: center;
    margin-right: 0;
  }
`

const StyledHamburgerWrapper = styled.div`
align-items: center;
justify-content: center;
display: flex;
width: 79px;
@media (min-width: 800px) {
  display:none;
}
& > div {
  cursor: pointer;
}
`

export default TopBar
