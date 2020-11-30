import {useCallback, useEffect, useState} from "react";

import {useWallet} from "use-wallet";
import useSushi from "./useSushi";
import {getNftBalance, getNftStakedBalance, getYmenMakerContract, getYmenStakingContract} from "../sushi/utils";
import {fetchCards} from "../views/Nft/openSea/openSea";
import useBlock from "./useBlock";

interface INftBalance {
  staked: number;
  notStaked: number;
}

type NftBalance = { [id: number] : INftBalance }

const useNftBalance = () => {
  const [balance, setBalance] = useState<NftBalance>({});
  const {account}: {account: string} = useWallet();
  const sushi = useSushi();
  const ymenMakerContract = getYmenMakerContract(sushi);
  const ymenStakingContract = getYmenStakingContract(sushi);
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    const cards = await fetchCards({ dir: 'desc', offset: 0, limit: 1000 });
    const nftIdList = cards.map((el: any) => {
      return parseInt(el.token_id);
    })

    const result = await getNftBalance(ymenMakerContract, account, nftIdList);
    const resultStaked = await getNftStakedBalance(ymenStakingContract, account, nftIdList);

    const balances: NftBalance = {...balance};
    nftIdList.forEach((id, idx) => {
      balances[id] = {staked: resultStaked[idx], notStaked: result[idx]};
    })

    setBalance(balances);
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance();
    }
  }, [account, fetchBalance, sushi, block, setBalance])

  return balance;
}

export default useNftBalance;