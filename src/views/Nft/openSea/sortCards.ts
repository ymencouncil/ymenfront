import { RARITIES } from './rarities'
import { CardRarity, OpenSeaAsset, SortedCards } from './types'

export const sortCards = (assets: OpenSeaAsset[]): SortedCards => {
  const sortedCards = {} as SortedCards

  RARITIES.forEach((rarity) => {
    sortedCards[rarity] = []
    assets.forEach((asset: any) => {
      const { image_url, permalink, token_id } = asset
      const cardRarity = (asset as any).traits.find((el: any) => el.trait_type === 'Rarity')?.value?.toLowerCase() as CardRarity;
      if (rarity === 'all') {
        sortedCards[rarity].push({ image_url, permalink, token_id })
      } else if (cardRarity === rarity) {
        sortedCards[rarity].push({ image_url, permalink, token_id })
      }
    })
  })

  return sortedCards
}
