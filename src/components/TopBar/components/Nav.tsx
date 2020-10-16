import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

interface NavProps {
  onPresentMobileMenu: () => void
}

const Nav: React.FC<NavProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Mutants
      </StyledLink>
      <StyledAbsoluteLink href="https://snapshot.page/#/ymen" target="_blank">
        Governance
      </StyledAbsoluteLink>
      {/* <StyledText>Team</StyledText> */}
      <StyledAbsoluteLink
        href="https://medium.com/@realymenfinance/y-men-finance-yield-farming-2-0-79033e2e12b7"
        target="_blank"
      >
        About
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 800px) {
    display: none;
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[1000]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[1100]};
  }
  &.active {
    color: ${(props) => props.theme.color.blue[200]};
    &:before {
      background-color: ${(props) => props.theme.color.grey[1100]};
      content: '';
      border-radius: 5px;
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 5px;
      @media (max-width: 400px) {
        display: none;
      }
    }
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[1000]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[1100]};
  }
  &.active {
    color: ${(props) => props.theme.color.grey[200]};
  }
  &:before {
    background-color: ${(props) => props.theme.color.blue[200]};
    width: 5px;
    height: 5px;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`
const StyledText = styled.p`
  color: ${(props) => props.theme.color.grey[1000]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[5]}px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  text-decoration: none;
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
