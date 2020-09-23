import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.blue[800]};
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100%;
`

export default Card
