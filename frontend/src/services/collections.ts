import axios, { AxiosResponse, AxiosError } from 'axios'
import { reactive } from '@vue/composition-api'

import config from '../config/config'
import { InterfaceCollection } from 'src/interfaces'
import { getAuthenticationToken } from './authentication'

/**
 * Service functions
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

    console.log(response.data)
    return response.data as InterfaceCollection
  } catch (error) {
    console.error(error as AxiosError)
  }
}
 const fetchCollections = async (): Promise<InterfaceCollection[]|undefined> => {
  const token = await getAuthenticationToken()
  try {
    const response: AxiosResponse = await axios.get(`${config.apiUrl}/collections`, {
      headers: {
        Authorization: `Bearer ${String(token)}`
      }
    })

    console.log(response.data)
    return response.data as InterfaceCollection[]
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
    return await createNewCollection(title)
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

  return {
    createCollection,
    getCollections,
    state,
  }
}

export {
  fetchCollections,
  useCollections,
}