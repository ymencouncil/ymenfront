import { OpenSeaAsset, OpenSeaAssetRequest } from './types'

const BASE_URL = 'https://api.opensea.io/api/v1/assets/'
const CONTRACT_ADDRESS = '0x6f1e642f460447b012fc6bff215a198b3075e91e'

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
