import axios, { AxiosResponse } from 'axios'
import config from '../config/config'
import { InterfacePage } from 'src/interfaces'

/**
 * Fetches data. Should ideally be abstracted
 */
const fetchPage = async (slug: string): Promise<InterfacePage|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/pages?slug=${slug}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const pages: InterfacePage[] = response.data

      return pages.length > 0 ? pages[0] : undefined
    }
  } catch (error) {
    console.error(error)
  }
}

export {
  fetchPage
}