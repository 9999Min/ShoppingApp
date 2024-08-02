import type { goodsItem } from './global'

//主页home的类型声明
//分类的类型声明
export type categoryItem = {
  icon: string
  id: string
  name: string
}

//首页-热门推荐数据类型
export type hotItem = {
  /** 说明 */
  alt: string
  /** id */
  id: string
  /** 图片集合[ 图片路径 ] */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 标题 */
  title: string
  /** 推荐类型 */
  type: string
}

/** 猜你喜欢-商品类型 */
export type guessItem = goodsItem
