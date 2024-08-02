import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'
/**
 * 登录请求参数类型
 */
export type loginParams = {
  code: string
  encryptedData: string
  iv: string
}
/**
 *小程序登录
 * @param data
 * @returns
 */
export const postLoginWxMin = (data: loginParams) => {
  return http<LoginResult>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}
/**
 * 小程序模拟快捷登录
 * @returns
 */
export const postSimpleLoginWxMin = () => {
  return http<LoginResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber: '18073649999',
    },
  })
}
