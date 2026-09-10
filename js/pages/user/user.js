import { getUser } from '../../api/get-user.js'
import { getRepos, REPOS_PER_PAGE } from '../../api/get-repos.js'
import { message } from '../../components/message.js'
import { spinner } from '../../components/spinner.js'
import { getErrorMessage } from '../../lib/api-error.js'
import { formatNumber } from '../../lib/format.js'
import { appLayout } from '../_layouts/app.js'
import { filters, setupFilters, DEFAULT_SORT, SORT_OPTIONS } from './filters.js'
import { reposTable } from './repos-table.js'
import { userProfile } from './user-profile.js'

export async function userPage({ params, query, outlet }) {
  const { username } = params
  const routeHash = window.location.hash

  document.title = `${username} | Challenge`
  outlet.innerHTML = appLayout(spinner())

  let data

  try {
    data = await Promise.all([getUser(username), getRepos(username)])
  } catch (error) {
    if (window.location.hash !== routeHash) {
      return
    }

    const notFoundMessage = `Usuário "${username}" não encontrado.`

    outlet.innerHTML = appLayout(message(getErrorMessage(error, notFoundMessage)))
    return
  }

  if (window.location.hash !== routeHash) {
    return
  }

  const [user, repos] = data

  document.title = `${user.name ?? user.login} | Challenge`

  const state = {
    search: '',
    sort: getSortFromQuery(query),
  }

  outlet.innerHTML = appLayout(`
    ${userProfile(user)}

    <section class="repos">
      <div class="repos-title">
        <h2>Repositórios</h2>
        <span class="text-muted">
          ${formatNumber(user.public_repos)} públicos
        </span>
      </div>

      ${user.public_repos > REPOS_PER_PAGE ? reposLimitWarning() : ''}

      ${filters(state)}

      <div id="repos-list"></div>
    </section>`)

  const reposList = document.querySelector('#repos-list')

  function renderRepos() {
    const search = state.search.trim().toLowerCase()
    const { compare } = SORT_OPTIONS.find((option) => option.value === state.sort)

    const visibleRepos = repos
      .filter((repo) => repo.name.toLowerCase().includes(search))
      .sort(compare)

    reposList.innerHTML = reposTable(visibleRepos)
  }

  setupFilters(state, () => {
    updateSortParam(username, state.sort)
    renderRepos()
  })

  renderRepos()
}

function getSortFromQuery(query) {
  const sort = query.get('ordem')
  const isValidSort = SORT_OPTIONS.some((option) => option.value === sort)

  return isValidSort ? sort : DEFAULT_SORT
}

function updateSortParam(username, sort) {
  const path = `#/user/${encodeURIComponent(username)}`
  const hash = sort === DEFAULT_SORT ? path : `${path}?ordem=${sort}`

  if (window.location.hash !== hash) {
    window.history.replaceState(null, '', hash)
  }
}

function reposLimitWarning() {
  return `
    <p class="text-muted small">
      Este usuário tem muitos repositórios. Exibindo os ${REPOS_PER_PAGE}
      atualizados mais recentemente.
    </p>`
}
