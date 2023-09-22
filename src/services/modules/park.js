import hwRequest from "../request";
/**园区管理 */
/**
 * 企业列表
 * @param {*} params {name:String,page:String,pageSize:String}
 * @returns
 */
export function getEnterpriseAPI(params) {
  return hwRequest.get({
    url: "/park/enterprise",
    params,
  });
}

/**
 * 删除企业
 * @param {*} params id String
 * @returns
 */
export function delEnterPriseAPI(id) {
  return hwRequest.delete({
    url: `/park/enterprise/${id}`,
  });
}
