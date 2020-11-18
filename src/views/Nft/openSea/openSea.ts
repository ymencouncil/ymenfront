import { OpenSeaAsset, OpenSeaAssetRequest } from './types'

const BASE_URL = 'https://api.opensea.io/api/v1/assets/'
const CONTRACT_ADDRESS = '0xa9f4bfe3fc4376478ed3cc7380c08d1646b1f0b8'

export const fetchCards = (
  req: OpenSeaAssetRequest,
): Promise<OpenSeaAsset[]> => {
  const { dir, offset, limit } = req
  return fetch(
    `${BASE_URL}?asset_contract_address=${CONTRACT_ADDRESS}&order_direction=${dir}&offset=${offset}&limit=${limit}`,
  )
    .then((res) => res.json())
    .then((parsed) => parsed.assets as OpenSeaAsset[])
}
