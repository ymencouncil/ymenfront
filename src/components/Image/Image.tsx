import React from 'react'
import styled from 'styled-components'

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <StyledImage {...props} />
}

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`

export default Image
