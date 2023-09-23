import hwRequest from '../request'

/**
 * 登录接口
 * @param {*} data { username,password}
 * @returns {*} promise
 */
export function loginAPI(data) {
  return hwRequest.post({
    url: '/park/login',
    data
  })
}
/**
 * 删除月卡
 * @param {*} id
 * @returns
 */
export function delCardAPI(id) {
  return hwRequest.delete({
    url: `/parking/card/${id}`
  })
}
/**
 * 批量删除月卡
 * @param {*} ids [1,2,3]
 * @returns
 */
export function delAllCardAPI(ids) {
  return hwRequest.delete({
    url: `/parking/card/${ids.join(',')}`
  })
}
