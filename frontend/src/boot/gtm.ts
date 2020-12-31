import { boot } from 'quasar/wrappers'
import gtm from 'src/utilities/gtm'

export default boot((data) => {
  data.router.afterEach((to: { path: string }) => {
    gtm.logPage(to.path)
  })
})