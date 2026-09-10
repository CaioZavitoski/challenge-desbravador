import { api } from '../lib/axios.js'

export const REPOS_PER_PAGE = 100

export async function getRepos(username) {
  const response = await api.get(`/users/${encodeURIComponent(username)}/repos`, {
    params: {
      per_page: REPOS_PER_PAGE,
      sort: 'updated',
    },
  })

  return response.data
}
