import axios from 'axios'
import userService from './user'

const baseUrl = '/api/events'

const config = () => ({
  headers: {
    Authorization: `Bearer ${userService.getToken()}`
  }
})

const updateEvent = async (id, payload) => {
  const res = await axios.put(`${baseUrl}/${id}`, payload, config())
  return res.data
}

const getUsersOwn = async () => {
  const res = await axios.get(`${baseUrl}/usersOwn`, config())
  return res.data
}

const create = async (data) => {
  const res = await axios.post(baseUrl, data, config())
  return res.data
}

export default {
  getUsersOwn,
  create,
  updateEvent
}
