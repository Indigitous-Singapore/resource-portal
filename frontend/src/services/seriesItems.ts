/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios'
import { Ref, ref } from '@vue/composition-api'

import config from '../config/config'

import { InterfaceSeriesItem } from 'src/interfaces'

/**
 * Fetches data. Should ideally be abstracted
 */
const fetchSeriesItems = async (): Promise<InterfaceSeriesItem[]|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/series-items`)
      console.log(response.data)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const seriesItems: InterfaceSeriesItem[] = response.data
      return seriesItems
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchSeriesItem = async (id: string): Promise<InterfaceSeriesItem|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/series-items/${id}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const seriesItem: InterfaceSeriesItem = response.data

      return seriesItem
    }
  } catch (error) {
    console.error(error)
  }
}

const state: Ref<InterfaceSeriesItem[]> = ref([])

const useSeriesItems = () => {
  const getSeriesItems = async ( ) => {
    const seriesItems: InterfaceSeriesItem[] | undefined = await fetchSeriesItems()

    if (seriesItems === undefined) {
      console.error('SeriesItems is undefined')
    } else {
      state.value = [...seriesItems]
    }

    return seriesItems
  }

  const getSeriesItem = async (id: string) => {
    const seriesItem: InterfaceSeriesItem | undefined = await fetchSeriesItem(id)

    if (seriesItem === undefined) {
      console.error(`SeriesItem ${id} is undefined`)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const seriesItems: InterfaceSeriesItem[] = JSON.parse(JSON.stringify(state.value))
      const seriesItemIndex: number = seriesItems.findIndex(currentSeriesItem => String(currentSeriesItem.id) === id)
      if (seriesItemIndex === -1) {
        seriesItems.push(seriesItem)
      } else {
        seriesItems[seriesItemIndex] = seriesItem
      }
      state.value = seriesItems
    }

    return state.value
  }

  return {
    getSeriesItems,
    getSeriesItem,
    state
  }
}

export {
  useSeriesItems
}