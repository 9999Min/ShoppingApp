// src/types/category.d.ts
import type { goodsItem } from './global'

/** 一级分类项 */
export type categoryTopItem = {
  /** 二级分类集合[ 二级分类项 ] */
  children: categoryChildItem[]
  /** 一级分类id */
  id: string
  /** 一级分类图片集[ 一级分类图片项 ] */
  imageBanners: string[]
  /** 一级分类名称 */
  name: string
  /** 一级分类图片 */
  picture: string
}

/** 二级分类项 */
export type categoryChildItem = {
  /** 商品集合[ 商品项 ] */
  goods: goodsItem[]
  /** 二级分类id */
  id: string
  /** 二级分类名称 */
  name: string
  /** 二级分类图片 */
  picture: string
}
