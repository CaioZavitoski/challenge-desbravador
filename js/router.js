export function startRouter(routes, outlet) {
  function handleRoute() {
    const [path, search] = (window.location.hash.slice(1) || '/').split('?')
    const { page, params } = matchRoute(routes, path)

    window.scrollTo(0, 0)

    page({
      params,
      query: new URLSearchParams(search),
      outlet,
    })
  }

  window.addEventListener('hashchange', handleRoute)

  handleRoute()
}

function matchRoute(routes, path) {
  const segments = path.split('/').filter(Boolean).map(decodeSegment)

  for (const route of routes) {
    const routeSegments = route.path.split('/').filter(Boolean)

    if (route.path === '*' || routeSegments.length !== segments.length) {
      continue
    }

    const params = {}

    const isMatch = routeSegments.every((routeSegment, index) => {
      if (routeSegment.startsWith(':')) {
        params[routeSegment.slice(1)] = segments[index]
        return true
      }

      return routeSegment === segments[index]
    })

    if (isMatch) {
      return { page: route.page, params }
    }
  }

  const fallback = routes.find((route) => route.path === '*')

  return { page: fallback.page, params: {} }
}

function decodeSegment(segment) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}
