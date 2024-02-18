import { useMemberStore } from '@/stores'
// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //拼接
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //超时时间
    options.timeout = 10000
    //添加请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    // console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 请求函数封装并返回promise对象
//请求成功，返回res.data,添加类型支持泛型
//请求失败，网络错误提示用户换网； 401错误，清理用户信息，跳转登录页；
//其他错误，根据后端轻提示信息提示
interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求错误',
            icon: 'none',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          title: '网络错误，换个网络试试',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
