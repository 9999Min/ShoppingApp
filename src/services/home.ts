import type { PageParams, PageResult, swiperItem } from '@/types/global'
import type { categoryItem, guessItem, hotItem } from '@/types/home'
import { http } from '@/utils/http'

//主页获取轮播图数据
export const getBannerApi = (num: number) => {
  return http<Array<swiperItem>>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite: num,
    },
  })
}

//主页获取分类数据
export const getCategoryApi = () => {
  return http<Array<categoryItem>>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

//主页获取热门推荐数据
export const getHostApi = () => {
  return http<Array<hotItem>>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

//主页获取猜你喜欢的分页的数据 类型：PageResult<guessItem>
export const getGuessApi = (data?: PageParams) => {
  return http<PageResult<guessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data,
  })
}
