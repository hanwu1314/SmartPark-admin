import hwRequest from "../request";

/**
 * 登录接口
 * @param {*} data { username,password}
 * @returns {*} promise
 */
export function loginAPI(data) {
  return hwRequest.post({
    url: "/park/login",
    data,
  });
}
