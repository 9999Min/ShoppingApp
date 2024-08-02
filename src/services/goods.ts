//商品接口
import type { goodsData } from '@/types/goods'
import { http } from '@/utils/http'
export const getGoodsDetailApi = (id: number) => {
  return http<goodsData>({
    url: '/goods',
    method: 'GET',
    data: {
      id,
    },
  })
}
