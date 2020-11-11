/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios'
import { Ref, ref } from '@vue/composition-api'
import _ from 'lodash'

import config from '../config/config'

//  Dummy data
// import projectsData from '../data/projects.data'
import { InterfaceCategory } from 'src/interfaces'

/**
 * Fetches data. Should ideally be abstracted
 */
const fetchCategories = async (): Promise<InterfaceCategory[]|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/Categories`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const categories: InterfaceCategory[] = response.data
      return categories
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchCategory = async (id: string): Promise<InterfaceCategory|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/Categories/${id}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const category: InterfaceCategory = response.data

      return category
    }
  } catch (error) {
    console.error(error)
  }
}

const state: Ref<InterfaceCategory[]> = ref([])

const useCategories = () => {

  const getCategories = async ( ) => {
    const categories: InterfaceCategory[] | undefined = await fetchCategories()

    if (categories === undefined) {
      console.error('Categories is undefined')
    } else {
      state.value = [...categories]
    }

    return categories
  }

  const getCategory = async (id: string) => {
    const category: InterfaceCategory | undefined = await fetchCategory(id)

    if (category === undefined) {
      console.error(`Category ${id} is undefined`)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const categories: InterfaceCategory[] = JSON.parse(JSON.stringify(state.value))
      const categoryIndex: number = categories.findIndex(currentCategory => String(currentCategory.id) === id)
      if (categoryIndex === -1) {
        categories.push(category)
      } else {
        categories[categoryIndex] = category
      }
      state.value = categories
    }

    return state.value
  }

  return {
    getCategories,
    getCategory,
    state
  }
}

export {
  useCategories
}