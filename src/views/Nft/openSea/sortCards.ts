import { RARITIES } from './rarities'
import { OpenSeaAsset, SortedCards } from './types'

export const sortCards = (assets: OpenSeaAsset[]): SortedCards => {
  const sortedCards = {} as SortedCards

  RARITIES.forEach((rarity) => {
    sortedCards[rarity] = []
    assets.forEach((asset) => {
      const { description, image_url, permalink } = asset
      if (rarity === 'all') {
        sortedCards[rarity].push({ image_url, permalink })
      } else if (description.toLowerCase().includes(rarity)) {
        sortedCards[rarity].push({ image_url, permalink })
      }
    })
  })

  return sortedCards
}
