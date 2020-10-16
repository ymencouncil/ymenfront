import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import Nav from './components/Nav'

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledLogoWrapper>
      <Logo />
    </StyledLogoWrapper>
    <StyledFooterInner>
      <Nav />
    </StyledFooterInner>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.color.blue[1100]};
  align-items: center;
  display: flex;
  justify-content: center;
`
const StyledLogoWrapper = styled.div`
  margin-left: 150px;
  @media (max-width: 1000px) {
    width: auto;
    margin: 0;
  }
`

const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  @media (max-width: 1000px) {
    width: auto;
    height: ${(props) => 3 * props.theme.topBarSize}px;
    margin: 0;
  }
`

export default Footer
