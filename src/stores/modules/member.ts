import type { LoginResult } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    //这样只能在web端才能配置使用
    // persist: true,
    persist: {
      storage: {
        //获取本地存储
        getItem(key) {
          return uni.getStorageSync(key)
        },
        //设置本地存储
        setItem(key, value) {
          return uni.setStorageSync(key, value)
        },
      },
    },
  },
)
