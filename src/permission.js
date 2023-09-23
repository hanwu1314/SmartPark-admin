/**所有权限控制相关的在此文件 */
import router from './router'
import { getToken } from './utils/auth'
/**白名单 */
const WHITE_LIST = ['/login', '/404']

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
