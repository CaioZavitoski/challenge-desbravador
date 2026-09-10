export function getErrorMessage(error, notFoundMessage) {
  const status = error.response?.status

  if (status === 404) {
    return notFoundMessage
  }

  if (status === 403 || status === 429) {
    return 'Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos.'
  }

  return 'Não foi possível carregar os dados. Verifique sua conexão e tente novamente.'
}
