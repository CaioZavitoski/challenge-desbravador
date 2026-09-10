import { api } from '../lib/axios.js'

export async function getUser(username) {
  const response = await api.get(`/users/${encodeURIComponent(username)}`)

  return response.data
}
