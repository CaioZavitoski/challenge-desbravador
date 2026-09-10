import { message } from '../components/message.js'
import { appLayout } from './_layouts/app.js'

export function notFoundPage({ outlet }) {
  document.title = 'Página não encontrada | Challenge'

  outlet.innerHTML = appLayout(message('Página não encontrada.'))
}
