import type { DetailProfile, ProfileParams } from '@/types/member'
import { http } from '@/utils/http'

/**
 * 获取个人信息
 */
export const getDetailProfileApi = () => {
  return http<DetailProfile>({
    method: 'GET',
    url: '/member/profile',
  })
}

/**
 * 修改个人信息
 * @param data 请求体参数
 */
export const putProfileApi = (data: ProfileParams) => {
  return http<DetailProfile>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
