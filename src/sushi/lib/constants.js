import BigNumber from 'bignumber.js/bignumber'
import React from 'react'
import Xavier from '../../assets/img/xavier.png';
import Beast from '../../assets/img/beast.png'
import Colosus from '../../assets/img/colosus.png'
import Grey from '../../assets/img/grey.png'
import Mangeto from '../../assets/img/mangeto.png'
import Mutant from '../../assets/img/mutant.png';
import Mystq from '../../assets/img/mystq.png'
import Rogue from '../../assets/img/rogue.png'
import Storm from '../../assets/img/storm.png'
import Shades from '../../assets/img/shades.png'
import Wolverine from '../../assets/img/wolverine.png';
export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  sushi: {
    1: '0xA663121582725aA0eb8BF20B0F56F1917762e873',
  },
  masterChef: {
    1: '0x595f13f53667c8071126D6d2Ab499358d967dA39',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  ymen: {
    1: '0xd0c59798f986d333554688cd667033d469c2398e',
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
13 AHF  0x80719b1b65cc804eb60d9754b84ac6dd242a1fff
*/


/*
TOKEN addresses on mainnet for reference
==========================================
0  USDT 0xdac17f958d2ee523a2206206994597c13d831ec7
1  USDC 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
2  DAI  0x6b175474e89094c44da98b954eedeac495271d0f
3  sUSD 0x57ab1ec28d129707052df4df418d58a2d46d5f51
4  COMP 0xc00e94cb662c3520282e6f5717214004a7f26888
5  LEND 0x80fb784b7ed66730e8b1dbd9820afd29931aab03
6  SNX  0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f
7  UMA  0x04fa0d235c4abf4bcf4787af4cf447de572ef828
8  LINK 0x514910771af9ca656af840dff83e8264ecf986ca
9  BAND 0xba11d00c5f74255f56a5e366f4f77f5a186d7f55
10 AMPL 0xd46ba6d942050d489dbd938a2c909a5d5039a161
11 YFI  0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e
12 YMEN 0xd0c59798f986d333554688cd667033d469c2398e
13 AHF  0xd6d3608f2d770d0a8d0da62d7afe21ea1da86d9c
14
15
16
17 
*/

/* POOL REWARDS
==========================================
USDT: 90
AMPL: 90
DAI: 90
LINK: 50
COMP: 60
LEND: 50
YFI: 50
WBTC: 90
YMEN: 180
MUTANT: 250
*/

export const supportedPools = [
  {
    pid: 8,
    lpAddresses: {
      1: '0x917c164e924b5cf4f36f7c6713e1e3330928d1ce',
    },
    tokenAddresses: {
      1: '0xd0c59798f986d333554688cd667033d469c2398e',
    },
    name: 'YMEN Xavier',
    symbol: 'YMEN-ETH UNI-V2 LP',
    tokenSymbol: 'YMEN',
    icon: <img width='95px' src={Xavier} />,
    pool: '4x Multiplier!',
    uniswapLPUrl: 'https://uniswap.info/pair/0x917c164e924b5cf4f36f7c6713e1e3330928d1ce',
  },
  {
    pid: 9,
    lpAddresses: {
      1: '0xb5ca2CF922208e4C6051d97cD49Bc5EF533d633a',
    },
    tokenAddresses: {
      1: '0xA663121582725aA0eb8BF20B0F56F1917762e873',
    },
    name: 'Mutant Cyclops',
    symbol: 'MUTANT-YMEN UNI-V2 LP',
    tokenSymbol: 'MUTANT',
    icon: <img width='95px' src={Mutant} />,
    pool: '8x Multiplier!',
    uniswapLPUrl: 'https://uniswap.info/pair/0xb5ca2CF922208e4C6051d97cD49Bc5EF533d633a',
  },
  {
    pid: 10,
    lpAddresses: {
      1: '0x80719b1b65cc804eb60d9754b84ac6dd242a1fff',
    },
    tokenAddresses: {
      1: '0xd6d3608f2d770d0a8d0da62d7afe21ea1da86d9c',
    },
    name: 'Project Shades',
    symbol: 'YMEN-AHF UNI-V2 LP',
    tokenSymbol: 'AHF',
    icon: <img width='55px' src={Shades} />,
    pool: '4x Multiplier!',
    uniswapLPUrl: 'https://info.uniswap.org/pair/0x80719b1b65cc804eb60d9754b84ac6dd242a1fff',
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    },
    tokenAddresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'Tether Rogue',
    symbol: 'USDT-ETH UNI-V2 LP',
    tokenSymbol: 'USDT',
    icon: <img width='95px' src={Rogue} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
    },
    tokenAddresses: {
      1: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
    },
    name: 'Ample Storm',
    symbol: 'AMPL-ETH UNI-V2 LP',
    tokenSymbol: 'USDC',
    icon: <img width='95px' src={Storm} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
    },
    tokenAddresses: {
      1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    name: 'DAI Wolverine',
    symbol: 'DAI-ETH UNI-V2 LP',
    tokenSymbol: 'DAI',
    icon: <img width='95px' src={Wolverine} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    },
    tokenAddresses: {
      1: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    name: 'Marine Beast',
    symbol: 'LINK-ETH UNI-V2 LP',
    tokenSymbol: 'LINK',
    icon: <img width='95px' src={Beast} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0xcffdded873554f362ac02f8fb1f02e5ada10516f',
    },
    tokenAddresses: {
      1: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    },
    name: 'COMP Mystique',
    symbol: 'COMP-ETH UNI-V2 LP',
    tokenSymbol: 'COMP',
    icon: <img width='95px' src={Mystq} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xcffdded873554f362ac02f8fb1f02e5ada10516f',
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0xab3f9bf1d81ddb224a2014e98b238638824bcf20',
    },
    tokenAddresses: {
      1: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    },
    name: 'Aave Grey',
    symbol: 'LEND-ETH UNI-V2 LP',
    tokenSymbol: 'LEND',
    icon: <img width='95px' src={Grey} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xab3f9bf1d81ddb224a2014e98b238638824bcf20',
  },
  {
    pid: 6,
    lpAddresses: {
      1: '0x2fdbadf3c4d5a8666bc06645b8358ab803996e28',
    },
    tokenAddresses: {
      1: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    },
    name: 'YFI Colossus',
    symbol: 'YFI-ETH UNI-V2 LP',
    tokenSymbol: 'YFI',
    icon: <img width='95px' src={Colosus} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0x2fdbadf3c4d5a8666bc06645b8358ab803996e28',
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
    },
    tokenAddresses: {
      1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    },
    name: 'Bitcoin Megneto',
    symbol: 'WBTC-ETH UNI-V2 LP',
    tokenSymbol: 'WBTC',
    icon: <img width='95px' src={Mangeto} />,
    pool: '',
    uniswapLPUrl: 'https://uniswap.info/pair/0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
  },
]
