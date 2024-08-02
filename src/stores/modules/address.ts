import type { addressItem } from '@/types/goods'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<addressItem>()
  const changeSelectedAddress = (val: addressItem) => {
    selectedAddress.value = val
  }
  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
