import { header } from '../../components/header.js'

export function appLayout(content) {
  return `
    ${header()}

    <main class="container py-4">${content}</main>`
}
