import {useWallet} from "use-wallet";
import useSushi from "./useSushi";
import {getNftEarned, getYmenStakingContract, harvestNft, stakeNft, unstakeNft} from "../sushi/utils";
import {useCallback, useEffect, useState} from "react";
import useBlock from "./useBlock";

const useNftStake = () => {
  const {account} = useWallet();
  const sushi = useSushi();
  const ymenStakingContract = getYmenStakingContract(sushi);
  const [balance, setBalance] = useState<number>(0);
  const block = useBlock()

  const handleStake = useCallback(async (nftIdList: number[], nftAmountList: number[]) => {
    try {
      return await stakeNft(ymenStakingContract, account, nftIdList, nftAmountList);
    } catch (e) {
      console.error(e);
    }
  }, [account, ymenStakingContract])

  const handleUnstake = useCallback(async (nftIdList: number[], nftAmountList: number[]) => {
    try {
      return await unstakeNft(ymenStakingContract, account, nftIdList, nftAmountList);
    } catch (e) {
      console.error(e);
    }
  }, [account, ymenStakingContract])

  const handleHarvest = useCallback(async () => {
    try {
      return await harvestNft(ymenStakingContract, account);
    } catch (e) {
      console.error(e);
    }
  }, [account, ymenStakingContract]);

  const fetchPending = useCallback(async () => {
    const earned = await getNftEarned(ymenStakingContract, account);
    setBalance(earned.toNumber());
  }, [ymenStakingContract, account]);

  useEffect(() => {
    if (account && ymenStakingContract && sushi) {
      fetchPending();
    }
  }, [account, block, ymenStakingContract, setBalance, sushi])

  return {onStake: handleStake, onUnstake: handleUnstake, onHarvest: handleHarvest, balance}
}

export default useNftStake;