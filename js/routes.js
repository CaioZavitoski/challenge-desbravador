import { homePage } from './pages/home.js'
import { userPage } from './pages/user/user.js'
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
    path: '*',
    page: notFoundPage,
  },
]
