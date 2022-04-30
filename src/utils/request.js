// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器： 1. 剥离无效数据 2. 处理token失效
// 4. 导出一个函数，调用当前的axios实例发请求，返回值promise

// 1. 导入axios
import axios from 'axios'
// 直接导入store模块来调用vuex
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 2. 创建axios实例 (instance 意思为 实例 )
const instance = axios.create({
  // axios 的一下配置，常见的为： baseURL timeout
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带

  // 在这里做一个判断或者说取出你的用户信息
  // 1. 获取用户信息对象
  const { profile } = store.state.user.profile
  // 2. 判断是否有token
  if (profile.token) {
    // 3. 设置token
    config.headers.Authorization = `Bearer: ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// res => res.data 取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空本地无效用户信息
    // 2. 跳转到登录页码
    // 3. 跳转需要传参 (当前路由地址) 给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里头: `/user?a=10` $route.path === /user $route.fullpath === /user?a=10
    // js模块中: router.currentRoute.value.fullpath 就是当前路由地址  router.currentRoute 是ref包装响应式数据
    const fullpath = encodeURIComponent(router.currentRoute.value.fullpath)
    router.push('/login?redirectUrl=' + fullpath)
  }
  return Promise.reject(err)
})
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求， 请求地址， 请求方式， 提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求 需要使用params来传递submitData  ?a=10&c=10
    // 2. 如果不是get请求 需要使用params来传递submitData    请求体传参
    // const a = {name:100} a.name a['name']
    // [] 设置一个动态的key，写js表达式， js表达式执行结果当作key
    // method参数：get，Get，GET 转换成小写再来判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
