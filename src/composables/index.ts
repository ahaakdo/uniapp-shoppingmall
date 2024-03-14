import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

//猜你喜欢
export const useGuessList = () => {
  //猜你喜欢
  const guessRef = ref<XtxGuessInstance>()
  //滚动触底
  const onScrolltolower = () => {
    console.log('触底')
    guessRef.value?.getMore()
  }
  //返回
  return {
    guessRef,
    onScrolltolower,
  }
}
