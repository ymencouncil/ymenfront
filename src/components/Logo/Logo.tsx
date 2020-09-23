import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import logo from '../../assets/img/logo.png'
import Image from '../Image/Image'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <Image src={logo} />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  height: ${(props) => props.theme.topBarSize}px;
  padding: 0;
  text-decoration: none;
`

export default Logo
