// import Axios from 'axios'
import _ from 'lodash'
import { InterfaceItemMedia } from 'src/interfaces'

/*
export const download = (
    media: InterfaceItemMedia
  ): void => {
  try {
    Axios.get(String(media.url), { responseType: 'blob' })
      .then(response => {
        const blob = new Blob([response.data], { type: String(media.mime) })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = media.name || `download.${media.ext || ''}`
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
  } catch (error) {
    console.error(error)
  }
}
*/
export const download = (
  media: InterfaceItemMedia
): void => {
  try {
    if (_.isString(media.url)) {
      window.open(media.url)
    } else {
      throw Error('No Media URL')
    }
  } catch (error) {
    console.error(error)
  }
}
