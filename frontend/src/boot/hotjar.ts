import Hotjar from 'vue-hotjar'
import { boot } from 'quasar/wrappers'

export default boot((data) => {
  const { Vue } = data
  Vue.use (Hotjar, {
    id: '2170082' // Hotjar Site ID
  })
});