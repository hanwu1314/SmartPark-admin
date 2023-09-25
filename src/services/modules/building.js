/**楼宇管理 */
import hwRequest from '../request'

export function getBuildingListAPI(params) {
  return hwRequest.get({
    url: '/park/building',
    params
  })
}
