import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
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
 * Fetches collections
 */
const fetchCollections = async (
  userOnly = true
): Promise<InterfaceCollection[]|undefined> => {
  const options: AxiosRequestConfig = {}

  if (userOnly) {
    const token = await getAuthenticationToken()
    options.headers = {
      Authorization: `Bearer ${String(token)}`
    }
  }

  try {
    const response: AxiosResponse = await axios.get(`${config.apiUrl}/collections`, options)
    return response.data as InterfaceCollection[]
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * Get collection
 */
const fetchCollection = async (id: number|string): Promise<InterfaceCollection|undefined> => {
  if (id === null || id === undefined) {
    console.error('Collection ID cannot be null')
    return undefined
  }

  const token = await getAuthenticationToken()
  const options = token ? {
    headers: {
      Authorization: `Bearer ${String(token)}`
    }
  } : undefined
  try {
    const response: AxiosResponse = await axios.get(`${config.apiUrl}/collections/${id}`, options)

    return response.data as InterfaceCollection
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * Edot collection
 */
const editCollection = async (id: number|string, attributes: Record<string, any>): Promise<InterfaceCollection|undefined> => {
  if (id === null || id === undefined) {
    console.error('Collection ID cannot be null')
    return undefined
  }

  const token = await getAuthenticationToken()
  const options = token ? {
    headers: {
      Authorization: `Bearer ${String(token)}`
    }
  } : undefined
  try {
    const response: AxiosResponse = await axios.put(`${config.apiUrl}/collections/${id}`, attributes, options)

    return response.data as InterfaceCollection
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
   * Creates a new collection
   */
  const createCollection = async (title: string): Promise<InterfaceCollection|undefined> => {
    const newCollection: InterfaceCollection|undefined = await createNewCollection(title)

    if(newCollection !== undefined) {
      state.collections.push(newCollection)
    }

    return newCollection
  }

  /**
   *  Get all collections of the users
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
   *  Get a single collection
   */
  const getCollection = async (id: number|string) => {
    const collection: InterfaceCollection | undefined = await fetchCollection(id)

    if (collection === undefined) {
      console.error('Collections is undefined')
    } else {
      //  Search state for collection id
      const index = state.collections.findIndex(stateCollection => stateCollection.id === collection.id)
      if (index === -1) {
        state.collections.push(collection)
      } else {
        state.collections[index] = collection
      }
    }

    return collection
  }

  /**
   *  Update a single collection
   */
  const updateCollection = async (id: number|string, attributes: Record<string, any>): Promise<InterfaceCollection | undefined> => {
    const collection: InterfaceCollection | undefined = await editCollection(id, attributes)

    if (collection === undefined) {
      console.error('Collections is undefined')
    } else {
      //  Search state for collection id
      const index = state.collections.findIndex(stateCollection => stateCollection.id === collection.id)
      if (index === -1) {
        const newCollections = [...state.collections]
        newCollections.push(collection)
        state.collections = [
          ...newCollections
        ]
      } else {
        const newCollections = [...state.collections]
        newCollections[index] = collection
        state.collections = [
          ...newCollections
        ]
      }
    }

    return collection
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
    getCollection,
    updateCollection,
    removeItem,
    state,
  }
}

export {
  fetchCollections,
  useCollections,
}