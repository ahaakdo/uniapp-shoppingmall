import type { LoginResult, profileParams } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()
    const member = ref<Pick<profileParams, 'provinceCode' | 'cityCode' | 'countyCode'>>()
    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }
    const setMember = (val: Pick<profileParams, 'provinceCode' | 'cityCode' | 'countyCode'>) => {
      member.value = val
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
      member,
      setMember,
    }
  },
  // TODO: 持久化
  {
    //网页
    // persist: true,
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
