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

/**
 * 删除楼宇
 * @param {*} data
 * @returns
 */
export function delBuildingListAPI(id) {
  return hwRequest.delete({
    url: `/park/building/${id}`
  })
}

/**
 * 编辑楼宇
 * @param {*} data
 * @returns
 */
export function updateEnterpriseAPI(data) {
  return hwRequest.put({
    url: `/park/building`,
    data
  })
}

/**
 * 查询可租赁楼宇
 * @param {*} data
 * @returns
 */
export function getBuildingRentListAPI() {
  return hwRequest.get({
    url: '/park/rent/building'
  })
}
