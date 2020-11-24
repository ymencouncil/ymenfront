import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import Page from '../../components/Page'
import { StyledCardAccent } from '../Farms/components/FarmCards'
import { fetchCards } from './openSea/openSea'
import { RARITIES } from './openSea/rarities'
import { sortCards } from './openSea/sortCards'
import { CardRarity, SortedCards } from './openSea/types'
import useNftBalance from "../../hooks/useNftBalance";
import useNftApproval from "../../hooks/useNftApproval";
import useNftApprove from "../../hooks/useNftApprove";
import useNftStake from "../../hooks/useNftStake";
import {NftStakingHeader} from "./NftStakingHeader";

const Nft: React.FC = () => {
  const [nftAmount, setNftAmount] = useState<{ [id: number]: number }>({});
  const [cards, setCards] = useState<SortedCards>(null)
  const [selectedRarity, setSelectedRarity] = useState<CardRarity>('all')
  const [hoverIndex, setHoverIndex] = useState<number>(-1)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const nftBalance = useNftBalance();
  const isNftApproved = useNftApproval();

  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useNftApprove();
  const {onStake, onUnstake} = useNftStake();

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

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const handleStake = useCallback(async (nftId: number, amount: number) => {
    if (!amount) return;

    try {
      await onStake([nftId], [amount]);
    } catch (e) {
      console.error(e);
    }
  }, [onStake])

  const handleUnstake = useCallback(async (nftId: number, amount: number) => {
    if (!amount) return;

    try {
      await onUnstake([nftId], [amount]);
    } catch (e) {
      console.error(e);
    }
  }, [onUnstake])

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
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <StyledHeader>{selectedRarity + ' cards'}</StyledHeader>
              <NftStakingHeader/>
            </div>


            {cards ? (
              cards[selectedRarity].map((card, i) => {
                const nftId = parseInt((card as any).token_id);
                const staked = Number(nftBalance?.[nftId]?.staked ?? 0);
                const notStaked = Number(nftBalance?.[nftId]?.notStaked ?? 0);
                const total = staked + notStaked;

                return (
                  <div key={i} style={{display: "flex", flexDirection: "column"}} >
                    <StyledAnchor href={card.permalink} target="_blank">
                      {hoverIndex === i ? <StyledCardAccent /> : null}
                      <StyledImg src={card.image_url} />
                      <Overlay
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(-1)}
                      ></Overlay>

                    </StyledAnchor>
                    <StakingContainer>
                     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                       {isNftApproved ? <>
                        <StakingTotal
                          onClick={(e) => setNftAmount({...nftAmount, [nftId]: total})}
                        >{`${staked}/${total} Staked`}</StakingTotal>
                        <StakingInput
                          min="0"
                          max={total}
                          value={nftAmount[nftId] ?? 0}
                          onChange={(e) => setNftAmount({...nftAmount, [nftId]: parseInt(e.target.value)})}
                          step="1"
                          type='number'
                        />
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <Button size='sm' style={{height: 20, marginBottom: 5}} onClick={() => {
                            const amount = nftAmount[nftId] ?? 0;
                            handleStake(nftId, Math.min(amount, total - staked))
                          }}>Stake</Button>
                          <Button size='sm' style={{height: 20}} onClick={() => {
                            const amount = nftAmount[nftId] ?? 0;
                            handleUnstake(nftId, Math.min(amount, staked));
                          }}>Unstake</Button>
                        </div>
                       </> : <Button size='sm' style={{width: 200, justifyContent: 'center'}} onClick={handleApprove}>Approve Staking</Button>}
                      </div>
                    </StakingContainer>

                  </div>
                )
              })
            ) : (
              <Loader />
            )}
          </CardListContainer>
        </NftPageContainer>
      </Page>
    </>
  )
}

const StakingTotal = styled.div`
  background-color: #f61e57;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Nasalization';
  font-size: 14px;
  font-weight: 700;
  box-shadow: 1px 14px 20px 5px #f61e574d;
`;

const StakingInput = styled.input`
  background-color: transparent;
  color: white;
  text-align: center;
  width: 50px;
  border: 1px solid white;
  border-radius: 25px;
  margin-right: 5px;
  margin-left: 5px;
`

const StakingContainer = styled.div`
  text-align: center;
  color: white;
  justify-content: center;
  margin-bottom: 30px;
`

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
  margin: 0 50px 20px;
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
