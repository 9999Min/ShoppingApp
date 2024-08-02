import type { HotParams, hotData } from '@/types/hot'
import { http } from '@/utils/http'

export const getHotRecommendApi = (url: string, data?: HotParams) => {
  return http<hotData>({
    method: 'GET',
    url,
    data,
  })
}
