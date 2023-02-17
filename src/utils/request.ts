// 引入axios
import axios from 'axios'

// 创建axios对象
const request = axios.create({
        // 基本路径
        baseURL:'https://api.shop.eduwork.cn/',//后台使用的接口地址
        // 超时时间
        timeout:8000,
})

// 定义一个window
const win:any = window;

// 设置请求拦截器，请求之前触发的
request.interceptors.request.use((config)=>{
    // 获取token
    const token = localStorage.getItem('token');
    // 判断token是否存在
    if(token){
        // 如果存在，就把token添加到请求头中
        config.headers!.Authorization = `Bearer ${token}`;
    }
    // 正确的话返回config
    return config;
},(error) => {
    // 错误的话返回错误信息
    return Promise.reject(error)
})

// 设置响应拦截器
request.interceptors.response.use((response)=>{
    // 正确的话返回响应的数据
    return response.data
},(error) => {

    // 把错误的信息返回给response
    const {response} = error
    //判断响应的状态码
    switch(response.status){
        case 401:
            win.$message.error('登陆失败，请重新登录');
            localStorage.removeItem('token');
            setTimeout(()=> {
                window.localStorage.href = '/login';
            },500);
            break;
        case 404:
            win.$message.error('接口不存在');
            break;
        case 500:
        case 502:
            win.$message.error('网络已异常');
            break;
        case 422:
            const msg = response.data.errors[Object.keys(response.data.errors)[0]][0];
            win.$message.error(msg);
            break;
    }
    // 错误的话返回错误的信息
    return Promise.reject(error)
})

// 暴露request对象
export default request;