/**计费规则 */
import hwRequest from '../request'
/**
 * 获取规则列表
 * @param {*} params
 * @returns
 */
export function getRuleListAPI(params) {
  return hwRequest.get({
    url: '/parking/rule/list',
    params
  })
}
