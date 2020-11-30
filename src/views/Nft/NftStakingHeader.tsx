import React, {useCallback} from 'react';
import styled from "styled-components";
import Earned from "../../assets/img/earned.png";
import Button from "../../components/Button";
import useNftStake from "../../hooks/useNftStake";

export function NftStakingHeader() {
  const {onHarvest, balance} = useNftStake();

  const handleHarvest = useCallback(async () => {
    try {
      await onHarvest();
    } catch (e) {
      console.error(e);
    }
  }, [onHarvest])

  return <NftStakingHeaderStyled>
    <img width="100px" src={Earned} />
    <NftStakingHeaderInsideContainer>
      <NftStakingHeaderText>MUTANT Earned</NftStakingHeaderText>
      <NftMutantEarned>{Number(balance).toFixed(2)}</NftMutantEarned>
      <Button size='sm' style={{height: 20, maxWidth: 100}} onClick={handleHarvest}>Harvest</Button>
    </NftStakingHeaderInsideContainer>
  </NftStakingHeaderStyled>
}

const NftMutantEarned = styled.div`
    font-family: 'eras-book-font';
    color: #f61e57;
    font-size: 36px;
    font-weight: 700;
    padding: 10px;
`;

const NftStakingHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NftStakingHeaderInsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NftStakingHeaderStyled = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  background: #0d2146;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;