import { RARITIES } from './rarities'
import { CardRarity, OpenSeaAsset, SortedCards } from './types'

export const sortCards = (assets: OpenSeaAsset[]): SortedCards => {
  const sortedCards = {} as SortedCards

  RARITIES.forEach((rarity) => {
    sortedCards[rarity] = []
    assets.forEach((asset) => {
      const { image_url, permalink } = asset
      const cardRarity = (asset as any).traits.find((el: any) => el.trait_type === 'Rarity')?.value?.toLowerCase() as CardRarity;
      if (rarity === 'all') {
        sortedCards[rarity].push({ image_url, permalink })
      } else if (cardRarity === rarity) {
        sortedCards[rarity].push({ image_url, permalink })
      }
    })
  })

  return sortedCards
}
