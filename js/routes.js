import { homePage } from './pages/home.js'
import { notFoundPage } from './pages/not-found.js'

export const routes = [
  {
    path: '/',
    page: homePage,
  },
  {
    path: '*',
    page: notFoundPage,
  },
]
