import { http } from '@/utils/http'
//获取微信支付参数
export const getPayWxPayMiniPayApi = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data,
  })
}

//模拟支付
export const getPayMockApi = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}
