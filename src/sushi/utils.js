import BigNumber from 'bignumber.js'
import {ethers} from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}

export const getYmenMakerAddress = (sushi) => {
  return sushi && sushi.ymenMakerAddress;
}

export const getYmenStakingAddress = (sushi) => {
  return sushi && sushi.ymenStakingAddress;
}

export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getYmenMakerContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.ymenMaker;
}

export const getYmenStakingContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.ymenStaking;
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
        pool,
        uniswapLPUrl,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        earnToken: 'mutant',
        earnTokenAddress: sushi.contracts.sushi.options.address,
        icon,
        pool,
        uniswapLPUrl,
      }),
    )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingMutant(pid, account).call()
}

export const getNftEarned = async (ymenStakingContract, account) => {
  return new BigNumber(await ymenStakingContract.methods.pendingMutant(account).call()).div(new BigNumber(10).pow(18));
}

export const getEthToBtcValue = async () => await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then(res => res.json()).then(json => json.ethereum.usd);

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getTotalLPYmenValue = async (
  masterChefContract,
  ymenContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total ymen value for the lpContract = w1
  const lpContractYmen = await ymenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpYmenWorth = new BigNumber(lpContractYmen)
  const totalLpYmenValue = portionLp.times(lpYmenWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const ymenAmount = new BigNumber(lpContractYmen)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    ymenAmount,
    totalYmenValue: totalLpYmenValue.div(new BigNumber(10).pow(18)),
    tokenPriceInYmen: ymenAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const stakeNft = async (ymenStakingContract, account, nftIdList, nftAmountList) => {
  return ymenStakingContract.methods.deposit(nftIdList, nftAmountList).send({from: account});
}

export const unstakeNft = async (ymenStakingContract, account, nftIdList, nftAmountList) => {
  return ymenStakingContract.methods.withdraw(nftIdList, nftAmountList).send({from: account});
}

export const harvestNft = async (ymenStakingContract, account) => {
  return ymenStakingContract.methods.harvest().send({from: account});
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getNftBalance = async (ymenMakerContract, account, nftIdList) => {
  try {
    return ymenMakerContract.methods.balanceOfBatch(nftIdList.map(() => account), nftIdList).call();
  } catch {
    return nftIdList.map(() => 0);
  }
}

export const getNftStakedBalance = async (getYmenStakingContract, account, nftIdList) => {
  try {
    return getYmenStakingContract.methods.getBalances(account, nftIdList).call();
  } catch {
    return nftIdList.map(() => 0);
  }
}

export const getNftApproval = async (ymenMakerContract, owner, operator) => {
  try {
    return ymenMakerContract.methods.isApprovedForAll(owner, operator).call();
  } catch {
    return false;
  }
}

export const approveNft = async (ymenMakerContract, ymenStakingAddress, account) => {
  return ymenMakerContract.methods
      .setApprovalForAll(ymenStakingAddress, true)
      .send({ from: account })
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
