import type {
  OrderCreateParams,
  OrderLogisticResult,
  OrderPreResult,
  OrderResult,
  OrderListParams,
  OrderListResult,
} from '@/types/order'
import { http } from '@/utils/http'

//获取预付订单
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}

//获取立即购买订单
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http<OrderPreResult>({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}

//提交订单
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    url: '/member/order',
    method: 'POST',
    data,
  })
}

//获取订单
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    url: `/member/order/${id}`,
    method: 'GET',
  })
}

//模拟发货
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}
//确认收货
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}
// 物流信息
export const getMemberOrderLogisticsByIdAPI = (id: string) => {
  return http<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}
//删除订单
export const deleteMemberOrderAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: `/member/order`,
    data,
  })
}
//获取订单
export const getMemberOrderAPI = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: 'GET',
    url: `/member/order`,
    data,
  })
}
//获取再次购买订单
export const getMemberOrderAgainAPI = (id: string) => {
  return http<OrderPreResult>({
    url: `/member/order/repurchase/${id}`,
    method: 'GET',
  })
}
