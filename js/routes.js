import { homePage } from './pages/home.js'
import { userPage } from './pages/user/user.js'
import { repoPage } from './pages/repo/repo.js'
import { notFoundPage } from './pages/not-found.js'

export const routes = [
  {
    path: '/',
    page: homePage,
  },
  {
    path: '/user/:username',
    page: userPage,
  },
  {
    path: '/repo/:owner/:name',
    page: repoPage,
  },
  {
    path: '*',
    page: notFoundPage,
  },
]
