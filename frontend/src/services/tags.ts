/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios'
import { Ref, ref } from '@vue/composition-api'
import _ from 'lodash'

import config from '../config/config'

//  Dummy data
// import projectsData from '../data/projects.data'
import { InterfaceTag } from 'src/interfaces'

/**
 * Fetches data. Should ideally be abstracted
 */
const fetchTags = async (): Promise<InterfaceTag[]|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/Tags`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tags: InterfaceTag[] = response.data
      return tags
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchTag = async (id: string): Promise<InterfaceTag|undefined> => {
  try {
    if ('apiUrl' in config) {
      const response: AxiosResponse = await axios.get(`${config.apiUrl}/Tags/${id}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tag: InterfaceTag = response.data

      return tag
    }
  } catch (error) {
    console.error(error)
  }
}

const state: Ref<InterfaceTag[]> = ref([])

const useTags = () => {

  const getTags = async ( ) => {
    const tags: InterfaceTag[] | undefined = await fetchTags()

    if (tags === undefined) {
      console.error('Tags is undefined')
    } else {
      state.value = [...tags]
    }

    return tags
  }

  const getTag = async (id: string) => {
    const tag: InterfaceTag | undefined = await fetchTag(id)

    if (tag === undefined) {
      console.error(`Tag ${id} is undefined`)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tags: InterfaceTag[] = JSON.parse(JSON.stringify(state.value))
      const tagIndex: number = tags.findIndex(currentTag => String(currentTag.id) === id)
      if (tagIndex === -1) {
        tags.push(tag)
      } else {
        tags[tagIndex] = tag
      }
      state.value = tags
    }

    return state.value
  }

  return {
    getTags,
    getTag,
    state
  }
}

export {
  useTags
}