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

/**
 * 获取tree权限列表
 * @returns
 */
export function getTreeListAPI() {
  return hwRequest.get({
    url: '/park/sys/permision/all/tree'
  })
}
