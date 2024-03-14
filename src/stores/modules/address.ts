import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  //选择的地址
  const selectedAddress = ref<AddressItem>()
  //buynow的地址
  const buyNowAddress = ref<AddressItem>()
  const changeSelectedAddress = (val: AddressItem) => {
    selectedAddress.value = val
  }
  const getBuyNowAddress = (val: AddressItem) => {
    buyNowAddress.value = val
  }
  return {
    selectedAddress,
    buyNowAddress,
    changeSelectedAddress,
    getBuyNowAddress,
  }
})
