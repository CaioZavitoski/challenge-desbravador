const numberFormatter = new Intl.NumberFormat('pt-BR')

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
})

export function formatNumber(value) {
  return numberFormatter.format(value ?? 0)
}

export function formatDate(date) {
  return date ? dateFormatter.format(new Date(date)) : '-'
}
