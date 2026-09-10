import { formatNumber } from '../../lib/format.js'
import { escapeHtml } from '../../lib/html.js'

export function userProfile(user) {
  return `
    <section class="panel profile">
      <img
        class="avatar"
        src="${escapeHtml(user.avatar_url)}"
        alt="Avatar de ${escapeHtml(user.login)}"
        width="88"
        height="88"
      />

      <div class="profile-info">
        <h1>${escapeHtml(user.name ?? user.login)}</h1>

        <a href="${escapeHtml(user.html_url)}" target="_blank" rel="noopener noreferrer">
          @${escapeHtml(user.login)}
        </a>

        ${user.bio ? `<p>${escapeHtml(user.bio)}</p>` : ''}

        <span class="text-muted small">
          <i class="bi bi-envelope" aria-hidden="true"></i>
          ${escapeHtml(user.email ?? 'N/A')}
        </span>
      </div>

      <div class="profile-stats">
        ${stat(user.followers, 'seguidores')}
        ${stat(user.following, 'seguindo')}
        ${stat(user.public_repos, 'repositórios')}
      </div>
    </section>`
}

function stat(value, label) {
  return `
    <div>
      <strong>${formatNumber(value)}</strong>
      <span class="text-muted small">${label}</span>
    </div>`
}
