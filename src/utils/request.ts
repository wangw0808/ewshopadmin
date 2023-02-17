// 引入axios
import axios from 'axios'

// 创建axios对象
const request = axios.create({
        // 基本路径
        baseURL:'https://api.shop.eduwork.cn/',
        // 超时时间
        timeout:8000,
})
// 设置请求拦截器，请求之前触发的
request.interceptors.request.use((config)=>{
    // 正确的话返回config
    return config;
},error => {
    // 错误的话返回错误信息
    return Promise.reject(error)
})

// 设置响应拦截器
request.interceptors.response.use((response)=>{
    // 正确的话返回响应的数据
    return response.data
},error => {
    // 错误的话返回错误的信息
    return Promise.reject(error)
})

// 暴露request对象
export default request;