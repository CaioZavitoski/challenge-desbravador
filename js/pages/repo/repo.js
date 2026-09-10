import { getRepo } from '../../api/get-repo.js'
import { message } from '../../components/message.js'
import { spinner } from '../../components/spinner.js'
import { getErrorMessage } from '../../lib/api-error.js'
import { formatDate, formatNumber } from '../../lib/format.js'
import { escapeHtml } from '../../lib/html.js'
import { appLayout } from '../_layouts/app.js'

export async function repoPage({ params, outlet }) {
  const { owner, name } = params
  const routeHash = window.location.hash

  document.title = `${owner}/${name} | Challenge`
  outlet.innerHTML = appLayout(spinner())

  const ownerHref = `#/user/${encodeURIComponent(owner)}`

  let repo

  try {
    repo = await getRepo(owner, name)
  } catch (error) {
    if (window.location.hash !== routeHash) {
      return
    }

    const notFoundMessage = `Repositório "${owner}/${name}" não encontrado.`

    outlet.innerHTML = appLayout(
      message(getErrorMessage(error, notFoundMessage), ownerHref),
    )
    return
  }

  if (window.location.hash !== routeHash) {
    return
  }

  outlet.innerHTML = appLayout(`
    <nav aria-label="Navegação">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#/">Início</a></li>
        <li class="breadcrumb-item">
          <a href="${ownerHref}">${escapeHtml(repo.owner.login)}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          ${escapeHtml(repo.name)}
        </li>
      </ol>
    </nav>

    <h1 class="repo-title">${escapeHtml(repo.name)}</h1>
    <p class="text-muted">${escapeHtml(repo.description ?? 'Sem descrição.')}</p>

    <div class="panel">
      <dl class="repo-details">
        <dt>Linguagem</dt>
        <dd>${escapeHtml(repo.language ?? '-')}</dd>

        <dt>Estrelas</dt>
        <dd>${formatNumber(repo.stargazers_count)}</dd>

        <dt>Forks</dt>
        <dd>${formatNumber(repo.forks_count)}</dd>

        <dt>Criado em</dt>
        <dd>${formatDate(repo.created_at)}</dd>

        <dt>Última atualização</dt>
        <dd>${formatDate(repo.updated_at)}</dd>
      </dl>
    </div>

    <div class="repo-actions">
      <a
        class="btn btn-primary"
        href="${escapeHtml(repo.html_url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="bi bi-github" aria-hidden="true"></i>
        GitHub
      </a>

      <a class="btn btn-outline-secondary" href="${ownerHref}">Voltar</a>
    </div>`)
}
