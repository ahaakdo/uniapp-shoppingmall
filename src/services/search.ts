import type { searchDataType } from '@/types/search'
import { http } from '@/utils/http'

export const getSearchListAPI = (data: { keyword: string }) => {
  return http<searchDataType>({
    url: '/search/tips',
    method: 'GET',
    data,
  })
}
