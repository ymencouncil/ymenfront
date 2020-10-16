import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Page from '../../components/Page'
import { StyledCardAccent } from '../Farms/components/FarmCards'
import { fetchCards } from './openSea/openSea'
import { RARITIES } from './openSea/rarities'
import { sortCards } from './openSea/sortCards'
import { CardRarity, SortedCards } from './openSea/types'

const Nft: React.FC = () => {
  const [cards, setCards] = useState<SortedCards>(null)
  const [selectedRarity, setSelectedRarity] = useState<CardRarity>('all')
  const [hoverIndex, setHoverIndex] = useState<number>(-1)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  useEffect(() => {
    const asd = fetchCards({ dir: 'desc', offset: 0, limit: 1000 }).then(
      (assets) => {
        setCards(sortCards(assets))
      },
    )
  }, [])

  const selectRarityFromDropdown = (rarity: CardRarity) => {
    setSelectedRarity(rarity)
    setDropdownOpen(false)
  }

  return (
    <>
      <Page>
        <NftPageContainer>
          <Sidebar>
            {RARITIES.map((rarity, i) => (
              <ButtonContainer key={i}>
                <Button
                  onClick={() => setSelectedRarity(rarity)}
                  size="sm"
                  variant={rarity === selectedRarity ? 'primary' : null}
                >
                  {rarity}
                </Button>
              </ButtonContainer>
            ))}
          </Sidebar>
          <CardListContainer>
            <DropdownButtonContainer>
              <Button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                size="sm"
                variant={'primary'}
              >
                {selectedRarity + ' cards'}
              </Button>
              {dropdownOpen ? (
                <DropdownOptionsContainer>
                  {RARITIES.map((rarity, i) =>
                    rarity !== selectedRarity ? (
                      <Button
                      key={i}
                        onClick={() => selectRarityFromDropdown(rarity)}
                        size="sm"
                      >
                        {rarity + ' cards'}
                      </Button>
                    ) : null,
                  )}
                </DropdownOptionsContainer>
              ) : null}
            </DropdownButtonContainer>
            <StyledHeader>{selectedRarity + ' cards'}</StyledHeader>
            {cards ? (
              cards[selectedRarity].map((card, i) => (
                <StyledAnchor key={i} href={card.permalink} target="_blank">
                  {hoverIndex === i ? <StyledCardAccent /> : null}
                  <StyledImg src={card.image_url} />
                  <Overlay
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(-1)}
                  ></Overlay>
                </StyledAnchor>
              ))
            ) : (
              <Loader />
            )}
          </CardListContainer>
        </NftPageContainer>
      </Page>
    </>
  )
}

const StyledHeader = styled.h3`
  text-transform: capitalize;
  width: 100%;
  margin: 30px auto;
  color: white;
  font-size: 24px;
  text-align: center;
  @media (max-width: 800px) {
    display: none;
  }
`

const NftPageContainer = styled.div`
  display: flex;
  max-width: ${(props) => props.theme.siteWidth}px;
  justify-content: flex-start;
`

const Sidebar = styled.aside`
  margin-top: 88px;
  @media (max-width: 800px) {
    display: none;
  }
`
const ButtonContainer = styled.div`
  flex-grow: 0;
  width: 100px;
  margin-bottom: 10px;
`

const CardListContainer = styled.main`
  width: 1500px;
  max-width: calc(100vw - 140px);
  flex: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledAnchor = styled.a`
  position relative;
  margin: 0 50px 50px;
`

const StyledImg = styled.img`
  width: 300px;
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 250px;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  transition: 1s ease;
  background-color: #09193a;
  :hover {
    opacity: 0;
  }
  @media (max-width: 800px) {
    opacity: 0;
  }
`

const DropdownButtonContainer = styled.div`
  position: relative;
  width: 100vw;
  margin: 20px;
  @media (min-width: 800px) {
    display: none;
  }
`

const DropdownOptionsContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 36px;
  & > button {
    border-radius: 0;
  }
  & > button:first-child {
    border-radius: 18px 18px 0 0;
  }
  & > button:last-child {
    border-radius: 0 0 18px 18px;
  }
`

export default Nft
