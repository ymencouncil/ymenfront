export interface OpenSeaAssetRequest {
  dir: 'desc' | 'asc'
  offset: number
  limit: number
}

export interface OpenSeaAsset extends OpenSeaCard {
  description: string
}

export interface OpenSeaCard {
  image_url: string
  permalink: string
  token_id: string
}

export type SortedCards = {
  [key in CardRarity]: OpenSeaCard[]
}

export type CardRarity = 'all' | 'common' | 'rare' | 'epic' | 'legendary'
