import { routes } from './routes.js'
import { startRouter } from './router.js'

startRouter(routes, document.querySelector('#app'))
