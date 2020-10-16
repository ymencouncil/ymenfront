import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  text?: string
  to?: string
  variant?: 'default' | 'secondary' | 'tertiary' | 'primary'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[200]
      break
    case 'primary':
      buttonColor = color.grey[900]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }
  let backgroundColor: string
  let boxShadow: string
  switch (variant) {
    case 'primary':
      boxShadow = `0px 20px 30px 0px #34fcf521;`
      backgroundColor = color.blue[200]
      break
    case 'default':
    default:
      boxShadow = ` 1px 14px 20px 5px #f61e574d;`
      backgroundColor = color.grey[1100]
  }
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      // boxShadow = `1px 1px 2px ${color.grey[1100]},
      //   -2px -2px 4px ${color.grey[1110]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      // boxShadow = `1px 1px 2px ${color.grey[1100]},
      // -2px -2px 4px ${color.grey[1110]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      // boxShadow = `1px 1px 2px ${color.grey[1100]},
      //   -2px -2px 12px -1px ${color.grey[1110]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      )
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      backgroundColor={backgroundColor}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string
  backgroundColor: string
  color: string
  disabled?: boolean
  fontSize: number
  padding: number
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  border: 0;
  border-radius: 25px;
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) => (!props.disabled ? props.color : `${props.color}55`)};
  cursor: pointer;
  display: flex;
  font-family: 'Nasalization';
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  height: ${(props) => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${(props) => props.padding}px;
  padding-right: ${(props) => props.padding}px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  &:hover {
    background-color: ${(props) =>
      props.backgroundColor === props.theme.color.blue[200]
        ? props.theme.color.blue[200]
        : props.theme.color.grey[1150]};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button
