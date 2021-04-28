import { Route, NavigationGuardNext } from 'vue-router'
import { isAuthenticated } from '../../services/authentication'

export default async (to: Route, from: Route, next: NavigationGuardNext) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (typeof to.meta === 'object' && 'private' in to.meta && to.meta.private) {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      next({
        path: `/login?redirectUrl=${encodeURIComponent(to.path)}`
      })
      return
    }
  } 
  
  next()
}