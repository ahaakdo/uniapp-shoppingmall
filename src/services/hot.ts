import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

type HotParams = PageParams & { subType?: string }
export const getHomeRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    url,
    method: 'GET',
    data,
  })
}
