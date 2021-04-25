import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { reactive } from '@vue/composition-api'
import _ from 'lodash'

import config from '../config/config'
import { InterfaceCollectionCategory } from 'src/interfaces'
import { getAuthenticationToken } from './authentication'

/**
 * Fetches collection categories
 */
const fetchCollectionCategories = async (
  userOnly = false
): Promise<InterfaceCollectionCategory[]|undefined> => {
  const options: AxiosRequestConfig = {}

  if (userOnly) {
    const token = await getAuthenticationToken()
    options.headers = {
      Authorization: `Bearer ${String(token)}`
    }
  }

  try {
    const response: AxiosResponse = await axios.get(`${config.apiUrl}/collection-categories`, options)
    return response.data as InterfaceCollectionCategory[]
  } catch (error) {
    console.error(error as AxiosError)
  }
}

/**
 * State
 */
const state = reactive({
  collectionCategories: [] as InterfaceCollectionCategory[]
})

/**
 * Hook 
 */
const useCollectionCategories = () => {
  /**
   *  Get all collection categories of the users
   */
  const getCollectionCategories = async () => {
    const collectionCategories: InterfaceCollectionCategory[] | undefined = await fetchCollectionCategories()

    if (collectionCategories === undefined) {
      console.error('CollectionCategories is undefined')
    } else {
      state.collectionCategories = collectionCategories
      console.log(state)
    }

    return collectionCategories
  }

  return {
    getCollectionCategories,
    state,
  }
}

export {
  fetchCollectionCategories,
  useCollectionCategories,
}