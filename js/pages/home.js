export function homePage({ outlet }) {
  document.title = '[ Challenge ] | GitHub'

  outlet.innerHTML = `
    <div class="home">
      <div class="home-card">
        <span class="brand">[ Challenge ]</span>

        <div class="home-text">
          <h1>Buscar usuário</h1>
          <span>
            Veja o perfil e os repositórios mais populares de qualquer usuário
            do GitHub.
          </span>
        </div>

        <form class="home-form" id="search-form">
          <label class="form-label" for="username">Usuário do GitHub</label>
          <input
            class="form-control"
            id="username"
            name="username"
            type="text"
            placeholder="Informe o usuário"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="none"
            required
          />

          <button class="btn btn-primary w-100" type="submit">Buscar</button>
        </form>
      </div>
    </div>`

  const form = document.querySelector('#search-form')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = form.username.value.trim()

    if (username) {
      window.location.hash = `#/user/${encodeURIComponent(username)}`
    }
  })

  form.username.focus()
}
