import { escapeHtml } from '../../lib/html.js'

export const SORT_OPTIONS = [
  {
    value: 'stars-desc',
    label: 'Mais estrelas',
    compare: (a, b) => b.stargazers_count - a.stargazers_count,
  },
  {
    value: 'stars-asc',
    label: 'Menos estrelas',
    compare: (a, b) => a.stargazers_count - b.stargazers_count,
  },
  {
    value: 'name',
    label: 'Nome',
    compare: (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
  },
  {
    value: 'updated',
    label: 'Atualizados recentemente',
    compare: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
  },
]

export const DEFAULT_SORT = 'stars-desc'

export function filters(state) {
  const options = SORT_OPTIONS.map((option) => {
    const selected = option.value === state.sort ? 'selected' : ''

    return `<option value="${option.value}" ${selected}>${option.label}</option>`
  })

  return `
    <div class="filters">
      <input
        class="form-control"
        id="search"
        type="search"
        placeholder="Nome do repositório"
        value="${escapeHtml(state.search)}"
        aria-label="Filtrar repositórios pelo nome"
      />

      <select class="form-select" id="sort" aria-label="Ordenar repositórios">
        ${options.join('')}
      </select>

      <button class="btn btn-primary" id="clear-filters" type="button">
        Remover filtros
      </button>
    </div>`
}

export function setupFilters(state, onChange) {
  const search = document.querySelector('#search')
  const sort = document.querySelector('#sort')
  const clearFilters = document.querySelector('#clear-filters')

  search.addEventListener('input', () => {
    state.search = search.value
    onChange()
  })

  sort.addEventListener('change', () => {
    state.sort = sort.value
    onChange()
  })

  clearFilters.addEventListener('click', () => {
    state.search = ''
    state.sort = DEFAULT_SORT

    search.value = ''
    sort.value = DEFAULT_SORT

    onChange()
  })
}
