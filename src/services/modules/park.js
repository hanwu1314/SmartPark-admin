import hwRequest from '../request'
/**园区管理 */
/**
 * 企业列表
 * @param {*} params {name:String,page:String,pageSize:String}
 * @returns
 */
export function getEnterpriseAPI(params) {
  return hwRequest.get({
    url: '/park/enterprise',
    params
  })
}

/**
 * 删除企业
 * @param {*} params id String
 * @returns
 */
export function delEnterPriseAPI(id) {
  return hwRequest.delete({
    url: `/park/enterprise/${id}`
  })
}

/**
 * 获取行业列表
 * @returns
 */
export function getIndustryListAPI() {
  return hwRequest.get({
    url: '/park/industry'
  })
}

/**
 * 创建企业
 * @param {*} data
 * @returns
 */
export function createEnterpriseAPI(data) {
  return hwRequest.post({
    url: '/park/enterprise',
    data
  })
}

/**
 * 获取企业详情
 * @param {*} id
 * @returns
 */
export function getEnterpriseDetailAPI(id) {
  return hwRequest.get({
    url: `/park/enterprise/${id}`
  })
}

/**
 * 更新企业
 * @param {*} data
 * @returns
 */
export function updateEnterpriseAPI(data) {
  return hwRequest.put({
    url: '/park/enterprise',
    data
  })
}

/**
 * 删除企业
 * @param {*} id
 * @returns
 */
export function delExterpriseAPI(id) {
  return hwRequest.delete({
    url: `/park/enterprise/${id}`
  })
}
/**
 * 创建合同
 * @param {*}
 * @returns
 */
export function createRentAPI(data) {
  return hwRequest.post({
    url: '/park/enterprise/rent',
    data
  })
}

/**
 * 退租
 * @param {合同id} rentId
 * @returns
 */

export function outRentAPI(rentId) {
  return hwRequest.put({
    url: `/park/enterprise/rent/${rentId}`
  })
}

/**
 * 获取合同列表
 * @param {*} id
 * @returns
 */
export function getRentListAPI(id) {
  return hwRequest.get({
    url: `/park/enterprise/rent/${id}`
  })
}

/**
 * 删除租赁合同
 * @param {*} id
 * @returns
 */
export function delRentListAPI(id) {
  return hwRequest.delete({
    url: `/park/enterprise/rent/${id}`
  })
}
