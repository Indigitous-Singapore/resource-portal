import axios, { AxiosResponse, AxiosError } from 'axios'
import { reactive } from '@vue/composition-api'
import _ from 'lodash'

import config from '../config/config'
import { InterfaceCollection } from 'src/interfaces'
import { getAuthenticationToken } from './authentication'

/**
 * Creates new collection
 * 
 * @param title
 */
const createNewCollection = async (title: string): Promise<InterfaceCollection|undefined> => {
  const token = await getAuthenticationToken()
  try {
    const response: AxiosResponse = await axios.post(`${config.apiUrl}/collections`, 
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${String(token)}`
        }
      }
    )

    return response.data as InterfaceCollection
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * Fetches collection
 */
const fetchCollections = async (): Promise<InterfaceCollection[]|undefined> => {
  const token = await getAuthenticationToken()
  try {
    const response: AxiosResponse = await axios.get(`${config.apiUrl}/collections`, {
      headers: {
        Authorization: `Bearer ${String(token)}`
      }
    })

    return response.data as InterfaceCollection[]
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * Destroy collection
 */
const destroyCollection = async (collectionId: number): Promise<InterfaceCollection|undefined> => {
  const token = await getAuthenticationToken()
  try {
    const response: AxiosResponse = await axios.delete(`${config.apiUrl}/collections/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${String(token)}`
      }
    })

    console.log(response.data)
    return response.data as InterfaceCollection
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * Adds an item to a collection
 */
const updateCollectionItems = async (items: number[], collectionId: number): Promise<InterfaceCollection|undefined> => {
  const token = await getAuthenticationToken()
  try {
    const response: AxiosResponse = await axios.put(`${config.apiUrl}/collections/${collectionId}`, {
      items,
    }, {
      headers: {
        Authorization: `Bearer ${String(token)}`
      }
    })

    return response.data as InterfaceCollection
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * State
 */
const state = reactive({
  collections: [] as InterfaceCollection[]
})

/**
 * Hook 
 */
const useCollections = () => {
  /**
   * 
   */
  const createCollection = async (title: string): Promise<InterfaceCollection|undefined> => {
    const newCollection: InterfaceCollection|undefined = await createNewCollection(title)

    if(newCollection !== undefined) {
      state.collections.push(newCollection)
    }

    return newCollection
  }

  /**
   * 
   */
  const getCollections = async () => {
    const collections: InterfaceCollection[] | undefined = await fetchCollections()

    if (collections === undefined) {
      console.error('Collections is undefined')
    } else {
      state.collections = collections
      console.log(state)
    }

    return collections
  }

  /**
   * 
   */
  const deleteCollection = async (collectionId: number): Promise<InterfaceCollection|undefined> => {
    const deletedCollection: InterfaceCollection|undefined = await destroyCollection(collectionId)

    if(deletedCollection) {
      const index: number = state.collections.findIndex((collection: InterfaceCollection) => {
        return collection.id === deletedCollection.id
      })
      state.collections.splice(index, 1)
    }

    return deletedCollection
  }

  /**
   * Adds item to the collection
   */
  const addItem = async (itemId: number, collectionId: number): Promise<InterfaceCollection|undefined> => {
    const collectionIndex: number = state.collections.findIndex((collection: InterfaceCollection): boolean => collection.id === collectionId)

    if(collectionIndex === -1) {
      alert('Collection was not found')
      return undefined
    } else {
      const items: number[] = state.collections[collectionIndex].items.map(item => item.id)
      items.push(itemId)
      
      const collection: InterfaceCollection|undefined = await updateCollectionItems(_.uniq(items), collectionId)

      if(collection === undefined) {
        alert('Item could not be added to collection')
      } else {
        state.collections[collectionIndex] = collection
      }
    }
  }

  /**
   * Remove item to the collection
   */
  const removeItem = async (itemId: number, collectionId: number): Promise<InterfaceCollection|undefined> => {
    const collectionIndex: number = state.collections.findIndex((collection: InterfaceCollection): boolean => collection.id === collectionId)

    if(collectionIndex === -1) {
      alert('Collection was not found')
      return undefined
    } else {
      const items: number[] = state
                              .collections[collectionIndex]
                              .items.map(item => item.id)
                              .filter(item => item !== itemId)
      
      const collection: InterfaceCollection|undefined = await updateCollectionItems(_.uniq(items), collectionId)

      if(collection === undefined) {
        alert('Item could not be removed from collection')
      } else {
        state.collections[collectionIndex] = collection
      }
    }
  }

  return {
    addItem,
    createCollection,
    deleteCollection,
    getCollections,
    removeItem,
    state,
  }
}

export {
  fetchCollections,
  useCollections,
}