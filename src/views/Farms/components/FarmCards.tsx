import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import {
  getEarned,
  getEthToBtcValue,
  getMasterChefContract,
} from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import icon8x from '../../../assets/img/icon8x.png'
import icon4x from '../../../assets/img/icon4x.png'
interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const createFarmCardRows = (farms: Farm[], stakedValue: StakedValue[]) => {
  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'YMEN',
  )

  let mutantPriceInYmen = 13500

  let sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  console.log(sushiPrice.toNumber())
  sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth.div(mutantPriceInYmen)
      : new BigNumber(0)

  // sushiPrice = new BigNumber(0.00000982743);
  // 0.00001052632
  // 0.00000982743
  // 0,0060946974
  // 27.70317*0.00022
  // 125 924

  // 1 ETH = 101756 MUTANT. 1 MUTANT = 0.00000982743 ETH (1/101756)

  // 1 ETH = 27.70317 YMEN. 1 YMEN = 0.0361 ETH
  // 1 MUTANT = 0.00022 YMEN

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  // TODO: After block height xxxx, SUSHI_PER_BLOCK = 100;
  const SASHIMI_PER_BLOCK = new BigNumber(100)

  let ethValueInSashimi = new BigNumber(0)
  let ethValueInSashimiNoWeight = new BigNumber(0)
  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      // TODO: Better code to get weth value of tokenNotEth-tokenNotEth
      if (stakedValue[i] && farm.pid !== 10) {
        ethValueInSashimi = ethValueInSashimi.plus(
          stakedValue[i].poolWeight.times(stakedValue[i].totalWethValue),
        )
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(
          stakedValue[i].totalWethValue,
        )
      }

      let farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
            .times(SASHIMI_PER_BLOCK)
            .times(BLOCKS_PER_YEAR)
            .times(stakedValue[i].poolWeight)
            .div(stakedValue[i].totalWethValue)
          : null,
      }

      if (
        stakedValue[i] &&
        farm.pid === 9 &&
        stakedValue[i].totalWethValue.toNumber() === 0
      ) {
        const sashimiElfWethValue = stakedValue[i].tokenAmount
          .times(sushiPrice)
          .times(new BigNumber(1))
        ethValueInSashimiNoWeight = ethValueInSashimiNoWeight.plus(
          sashimiElfWethValue,
        )
        farmWithStakedValue = {
          ...farm,
          ...stakedValue[i],
          apy: stakedValue[i]
            ? sushiPrice
              .times(SASHIMI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(sashimiElfWethValue)
            : null,
        }
      }

      const newFarmRows = [...farmRows]

      if (
        (newFarmRows.length === 1 && newFarmRows[0].length === 3) ||
        newFarmRows[newFarmRows.length - 1].length === 3
      ) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )
  return { rows, ethValueInSashimiNoWeight }
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()
  const [ethToUsdValue, setEthToUsdValue] = useState<number | undefined>()
  useEffect(() => {
    getEthToBtcValue()
      .then((x) => {
        console.log(x)
        return x
      })
      .then(setEthToUsdValue)
  }, [])
  const { rows, ethValueInSashimiNoWeight } = createFarmCardRows(
    farms,
    stakedValue,
  )
  const ethValueInUSDNoWeight = ethToUsdValue
    ? ethValueInSashimiNoWeight.times(ethToUsdValue).toNumber().toFixed(2)
    : ''
  return (
    <StyledCards>
      <ValueETH>
        Total valued assets({ethValueInUSDNoWeight ? 'USD' : 'TVL'}) are
        creating Mutants={' '}
        {ethValueInUSDNoWeight ||
          ethValueInSashimiNoWeight.toNumber().toFixed(2)}
      </ValueETH>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {i === 1 ? <RetiredCards>Deadpools</RetiredCards> : null}
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
          <StyledLoadingWrapper>
            <Loader text="Gathering the Mutants ..." />
          </StyledLoadingWrapper>
        )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'YMEN' && <StyledCardAccent />}
      {farm.tokenSymbol === 'MUTANT' && <StyledCardAccent />}
      {farm.tokenSymbol === 'AHF' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            {farm.tokenSymbol === 'YMEN' && (
              <MultiPlier>
                <img width="100%" src={icon4x} />
              </MultiPlier>
            )}
            {farm.tokenSymbol === 'MUTANT' && (
              <MultiPlier>
                <img width="100%" src={icon8x} />
              </MultiPlier>
            )}
            {farm.tokenSymbol === 'AHF' && (
              <MultiPlier>
                <img width="100%" src={icon4x} />
              </MultiPlier>
            )}
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>{farm.pool}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <ButtonContainer>
              <Button
                disabled={!poolActive}
                size="sm"
                text={poolActive ? 'Select' : undefined}
                to={`/farms/${farm.id}`}
              >
                {!poolActive && (
                  <Countdown
                    date={new Date(startTime * 1000)}
                    renderer={renderer}
                  />
                )}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                text="GET LP"
                size="sm"
                href={farm.uniswapLPUrl}
                variant="primary"
              ></Button>
            </ButtonContainer>
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm.apy
                  ? `${farm.apy
                    .times(new BigNumber(100))
                    .toNumber()
                    .toLocaleString('en-US')
                    .slice(0, -1)}%`
                  : 'Loading ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const ValueETH = styled.div`
  color: ${(props) => props.theme.color.grey[1100]};
  font-size: 30px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
`

const RetiredCards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: ${(props) => props.theme.color.grey[1100]};
  font-size: 30px;
  font-weight: 400;
  text-align: center;
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const MultiPlier = styled.div`
  background-color: transparent;
  width: 35%;
  position: absolute;
  margin-top: -12%;
  margin-right: -12%;
  right: 0;
  top: 0;
  border-radius: 100%;
`
export const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 16px;
  background: #525d72;
  color: #f0e3e9;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
