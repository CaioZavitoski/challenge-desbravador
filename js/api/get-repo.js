import { api } from '../lib/axios.js'

export async function getRepo(owner, name) {
  const response = await api.get(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
  )

  return response.data
}
