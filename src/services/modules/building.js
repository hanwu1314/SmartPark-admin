/**楼宇管理 */
import hwRequest from '../request'
/**
 * 楼宇数据
 * @param {s} params
 * @returns
 */
export function getBuildingListAPI(params) {
  return hwRequest.get({
    url: '/park/building',
    params
  })
}
/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export function createBuildingListAPI(data) {
  return hwRequest.post({
    url: '/park/building',
    data
  })
}
