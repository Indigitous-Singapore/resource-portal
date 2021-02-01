import _ from 'lodash'
import { InterfaceItemMedia, InterfaceItemMediaObject } from 'src/interfaces'
import { useItems } from 'src/services/items'

export const download = async (
  media: InterfaceItemMedia
): Promise<void> => {
  const { generatePresignedItemUrl } = useItems()

  try {
    if (media.hash && media.ext) {
      const mediaObject: InterfaceItemMediaObject|undefined = await generatePresignedItemUrl(String(`${media.hash}${media.ext}`))
      if (mediaObject && 'url' in mediaObject && _.isString(mediaObject.url)) {
        window.open(mediaObject.url)
      } else {
        throw Error('No Media URL')
      }
    }
  } catch (error) {
    console.error(error)
  }
}
