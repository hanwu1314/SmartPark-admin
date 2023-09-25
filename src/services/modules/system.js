import hwRequest from '../request'

/**
 * 获取角色列表
 * @param { page, pageSize} params
 * @returns
 */
export function getRoleListAPI(params) {
  return hwRequest.get({
    url: '/park/sys/role',
    params
  })
}
