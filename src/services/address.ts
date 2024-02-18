import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

//添加收获地址
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

//获取收获地址列表
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    url: '/member/address',
    method: 'GET',
  })
}

//获取地址详细信息
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}

//修改地址api
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}

//删除收获地址
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}
