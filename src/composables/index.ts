import type { XtxGuessInstance } from '@/types/components'
import { ref } from 'vue'
/**
 * 猜你喜欢组件组合式函数
 */
export const useGuess = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()
  // 滚动触底事件
  const onscrolltolower = () => {
    guessRef.value?.scrollGetMore()
  }
  // 返回 ref 和事件处理函数
  return {
    onscrolltolower,
    guessRef,
  }
}
