// 添加地址数据类型
export type AddressParams = {
  // 收获人姓名
  receiver: string
  //联系方式
  contact: string
  //省份编码
  provinceCode: string
  //城市编码
  cityCode: string
  //区县编码
  countyCode: string
  //详细地址
  address: string
  //默认
  isDefault: number
}

//获取地址列表数据
export type AddressItem = AddressParams & {
  //收货地址id
  id: string
  //省市区
  fullLocation: string
}
