import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderFrontProps {
  subtitle?: string
  title?: string
}

const PageHeaderFront: React.FC<PageHeaderFrontProps> = ({
  subtitle,
  title,
}) => {
  return (
    <StyledPageHeaderFront>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeaderFront>
  )
}

const StyledPageHeaderFront = styled.div`
  align-items: flex-start;
  align-self: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  @media (max-width: 400px) {
    margin: 0;
    padding: 0;
  }
`

const StyledTitle = styled.h1`
  font-family: 'eras-font';
  letter-spacing: 5px;
  color: ${(props) => props.theme.color.grey[1001]};
  font-size: 50px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledSubtitle = styled.h3`
  font-family: 'eras-font';
  color: ${(props) => props.theme.color.grey[1000]};
  font-size: 25px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  @media (max-width: 400px) {
    display: none;
  }
`

export default PageHeaderFront
