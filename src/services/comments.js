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

const getAll = async (helpId) => {
  const response = await axios.get(`${baseUrl}/${helpId}/comments`, config())
  return response.data
}

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/${newObject.helpId}/comments`, newObject, config())
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${updatedObject.helpId}/comments/${id}`, updatedObject, config())
  return response.data
}

const remove = (id, object) => {
  return axios.delete(`${baseUrl}/${object.helpId}/comments/${id}`, config())
}

export default { getAll, create, update, remove }