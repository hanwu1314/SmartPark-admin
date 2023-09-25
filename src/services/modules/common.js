import hwRequest from '../request'

/**
 * 上传接口
 * @param {*} data
 * @returns
 */
export function uploadAPI(data) {
  return hwRequest.post({
    url: '/upload',
    method: 'POST',
    data
  })
}
