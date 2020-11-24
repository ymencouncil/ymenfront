import {useCallback, useEffect, useState} from "react";
import {provider} from "web3-core";
import {useWallet} from "use-wallet";
import {getNftApproval, getYmenMakerContract, getYmenStakingAddress} from "../sushi/utils";
import useSushi from "./useSushi";

const useNftApproval = () => {
  const [approved, setApproved] = useState(false);
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi();
  const ymenMakerContract = getYmenMakerContract(sushi);
  const ymenStakingAddress = getYmenStakingAddress(sushi);

  const fetchNftApproval = useCallback(async () => {
    const approval = await getNftApproval(ymenMakerContract, account, ymenStakingAddress);
    setApproved(approval);
  }, [account, setApproved, ymenMakerContract, ymenStakingAddress]);

  useEffect(() => {
    if (account && sushi) {
      fetchNftApproval()
    }
  }, [account, sushi, fetchNftApproval])

  return approved;
}

export default useNftApproval;