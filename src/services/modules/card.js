/**月卡管理相关接口 */
import hwRequest from "../request";

/**
 * 查看月卡信息列表
 * @param {*} params {page:String,pageSize:String,carNumber?:String,personName?:String,cardStatus?:String}
 * @returns
 */
export function getCardListAPI(params) {
  return hwRequest.get({
    url: "/parking/card/list",
    params,
  });
}
