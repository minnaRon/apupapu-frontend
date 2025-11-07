import axios from 'axios'
import userService from './user'

const baseUrl = '/api/helps'

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${userService.getToken()}`
    }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, remove }
