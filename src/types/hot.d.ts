import type { PageParams, PageResult, goodsItem } from './global'

//根据通用分页数据类型，交叉类型 & 来扩展添加一个热门推荐的分页类型
export type HotParams = PageParams & { subType?: string }

//选项的数据 goodsItem的类型与通用分页相同，item项也与guessItem相同
export type subTypeItem = {
  /** id */
  id: string
  /** 标题 */
  title: string
  /** 分页数据 */
  goodsItems: PageResult<goodsItem>
}

export type hotData = {
  /** 图片地址 bannerPicture */
  bannerPicture: string
  /** id */
  id: string
  /** 选项 */
  subTypes: Array<subTypeItem>
  /** 标题 */
  title: string
}
