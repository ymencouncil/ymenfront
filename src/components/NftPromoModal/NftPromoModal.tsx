import React from 'react'

import { ModalProps } from '..//Modal'
import nft_promo from '../../assets/img/nft_promo.jpg'
import mobile_ymen from '../../assets/img/mobile_ymen.jpg'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const NftPromoModal: React.FC<ModalProps> = ({ onDismiss }) => {
  return (
    <StyledResponsiveWrapper>
      <Link to="/nft" onClick={onDismiss}>
        <StyledModal></StyledModal>
      </Link>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const desktopKeyframes = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`

const StyledResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  animation: ${desktopKeyframes} 0.5s forwards ease-out;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 80%;
    right: 0;
    left: 0;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  background-image: url(${nft_promo});
  background-size: cover;
  border: 2px solid ${(props) => props.theme.color.grey[300]}ff;
  border-radius: 12px;
  width: 100%;
  height: 454px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    background-image: url(${mobile_ymen});
    height: 360px;
  }
`

export default NftPromoModal
