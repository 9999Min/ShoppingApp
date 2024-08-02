import type { categoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

/** 分类页面的数据接口文件 */

/** 获取分类列表 */
export const getCategoryPageDataApi = () => {
  return http<Array<categoryTopItem>>({
    method: 'GET',
    url: '/category/top',
  })
}
