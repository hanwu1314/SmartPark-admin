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
 * 上传合同
 * @returns
 */
export function uploadAPI(data) {
  return hwRequest.post({
    url: '/upload',
    data
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
