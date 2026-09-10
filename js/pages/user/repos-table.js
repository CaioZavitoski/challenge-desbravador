import { formatNumber } from '../../lib/format.js'
import { escapeHtml } from '../../lib/html.js'

export function reposTable(repos) {
  if (repos.length === 0) {
    return `
      <p class="no-results">
        Nenhum repositório encontrado.
      </p>`
  }

  return `
    <div class="panel table-responsive">
      <table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>Nome</th>
            <th class="d-none d-md-table-cell">Descrição</th>
            <th>Linguagem</th>
            <th class="text-end">Estrelas</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          ${repos.map(repoRow).join('')}
        </tbody>
      </table>
    </div>`
}

function repoRow(repo) {
  const owner = encodeURIComponent(repo.owner.login)
  const name = encodeURIComponent(repo.name)
  const detailsHref = `#/repo/${owner}/${name}`

  return `
    <tr>
      <td>
        <a href="${detailsHref}">${escapeHtml(repo.name)}</a>
      </td>

      <td class="d-none d-md-table-cell text-muted">
        <span class="description">${escapeHtml(repo.description ?? '-')}</span>
      </td>

      <td>${escapeHtml(repo.language ?? '-')}</td>

      <td class="text-end">${formatNumber(repo.stargazers_count)}</td>

      <td>
        <a
          class="btn btn-primary btn-sm"
          href="${detailsHref}"
          aria-label="Ver detalhes de ${escapeHtml(repo.name)}"
        >
          <i class="bi bi-search" aria-hidden="true"></i>
        </a>
      </td>
    </tr>`
}
