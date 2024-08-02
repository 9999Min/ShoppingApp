// src/types/components.d.ts
//使用@vue/runtime-core为全局组件类型声明
//自动引入的自定义组件缺乏类型
//这里为自动引入的自定义组件类型声明
import type XtxGuess from './XtxGuess.vue'
import type XtxSwiper from './XtxSwiper.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}
//组件实例类型 InstanceType获取组件的实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
