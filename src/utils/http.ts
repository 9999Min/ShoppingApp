import { useMemberStore } from '@/stores'
//服务器基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
//定义拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //拼接url
    if (!options.url.startsWith('http')) {
      const url = baseURL + options.url
      options.url = url
    }
    //设置请求超时时间
    options.timeout = 10000
    //请求头标识，还要保留在请求方法中设置的请求头
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token请求头
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

//添加类型 传入泛型指定每次请求的数据的类型
interface resData<T> {
  code: string
  msg: string
  result: T
}

//封装并导出自定义request方法
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<resData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          //成功提取核心数据data
          resolve(res.data as resData<T>)
        } else if (res.statusCode === 401) {
          //401错误服务器正常响应，也会触发success,需要判断，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/page/login/login' })
          reject(res)
        } else {
          //通用错误
          uni.showToast({
            icon: 'none',
            title: (res.data as resData<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败，
      fail(err) {
        //网络失败才会触发fail回调
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}
