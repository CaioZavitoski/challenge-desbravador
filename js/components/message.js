import { escapeHtml } from '../lib/html.js'

export function message(text, backHref = '#/') {
  return `
    <div class="message">
      <p>${escapeHtml(text)}</p>
      <a class="btn btn-primary" href="${escapeHtml(backHref)}">Voltar</a>
    </div>`
}
