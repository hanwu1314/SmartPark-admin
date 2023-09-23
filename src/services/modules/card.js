/**月卡管理相关接口 */
import hwRequest from '../request'

/**
 * 查看月卡信息列表
 * @param {*} params {page:String,pageSize:String,carNumber?:String,personName?:String,cardStatus?:String}
 * @returns
 */
export function getCardListAPI(params) {
  return hwRequest.get({
    url: '/parking/card/list',
    params
  })
}
/**
 * 新增月卡
 * @data
 * @returns
 */
export function createCardAPI(data) {
  return hwRequest.post({
    url: '/parking/card',
    data
  })
}

/**
 * 获取编辑页详情
 * @param {*} id
 * @returns
 */
export function getDetailAPI(id) {
  return hwRequest.get({
    url: `/parking/card/detail/${id}`
  })
}

/**
 * 更新月卡
 * @param {*} data
 * @returns
 */
export function updateCardAPI(data) {
  return hwRequest.put({
    url: '/parking/card/edit',
    data
  })
}
