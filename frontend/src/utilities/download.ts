// import Axios from 'axios'
import _ from 'lodash'
import { InterfaceItemMedia } from 'src/interfaces'

export const download = (
  media: InterfaceItemMedia
): void => {
  try {
    if (_.isString(media.url)) {
      if (!/^https?:\/\//i.test(media.url)) {
        media.url = `https://${media.url}`
      }
      window.open(media.url)
    } else {
      throw Error('No Media URL')
    }
  } catch (error) {
    console.error(error)
  }
}
