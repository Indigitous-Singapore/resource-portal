import axios, { AxiosResponse } from 'axios'
import { reactive } from '@vue/composition-api'

import config from '../config/config'

//  Dummy data
// import itemsData from '../data/items.data'
import { InterfaceItem, InterfaceStateItems } from 'src/interfaces'

const packageItem = (item: InterfaceItem) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packagedItem: InterfaceItem = JSON.parse(JSON.stringify(item))

  return packagedItem
}

/**
 * Fetches data. Should ideally be abstracted
 */
const fetchItems = async (
    categories = ['all'],
    tags = ['all']
  ): Promise<InterfaceItem[]|undefined> => {
  try {
    if ('apiUrl' in config) {
      //  creates the query
      let query = ''
      if (categories.indexOf('all') === -1) {
        query += 'Categories=' + categories.join(',') + '&'
      }
      if (tags.indexOf('all') === -1) {
        query += 'Tags=' + tags.join(',') + '&'
      }

      const response: AxiosResponse = await axios.get(`${config.apiUrl}/items?${query}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const items: InterfaceItem[] = response.data
      const packagedItems: InterfaceItem[] = items.map((item: InterfaceItem) => {
        return packageItem(item)
      })

      return packagedItems
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchItem = async (id: string): Promise<InterfaceItem|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/items/${id}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const item: InterfaceItem = response.data

      return packageItem(item)
    }
  } catch (error) {
    console.error(error)
  }
}

const defaultState: InterfaceStateItems = {
  items: []
}

const state = reactive({
  ...defaultState
})

const useItems = () => {

  const getItems = async (
      categories: string[] = ['all'],
      tags: string[] = ['all'],
    ) => {
    const items: InterfaceItem[] | undefined = await fetchItems(categories, tags)

    if (items === undefined) {
      console.error('Items is undefined')
    } else {
      state.items = [...items]
      console.log(state)
    }

    return items
  }

  const getItem = async (id: string) => {
    const item: InterfaceItem | undefined = await fetchItem(id)

    if (item === undefined) {
      console.error(`Item ${id} is undefined`)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const items: InterfaceItem[] = JSON.parse(JSON.stringify(state.items))
      const itemIndex: number = items.findIndex(currentItem => String(currentItem.id) === id)
      if (itemIndex === -1) {
        items.push(item)
      } else {
        items[itemIndex] = item
      }
      state.items = items
    }

    return {
      ...state.items
    }
  }

  return {
    getItems,
    getItem,
    state
  }
}

export {
  useItems
}