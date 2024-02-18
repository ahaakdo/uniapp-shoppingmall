import type { profileDetail, profileParams } from '@/types/member'
import { http } from '@/utils/http'

//获取个人信息
export const getMemberProfileAPI = () => {
  return http<profileDetail>({
    url: '/member/profile',
    method: 'GET',
  })
}

//修改个人信息
export const putMemberProfileAPI = (data: profileParams) => {
  return http<profileDetail>({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}
