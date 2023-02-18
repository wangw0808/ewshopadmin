import request from "../utils/request";

// 对外第二次暴露

// 登录接口,接收从store/user里面的login方法传递过来的值
export function login(data:object){
    // return的是一个promise对象
    return request({
        url:'/api/auth/login',
        method:"post",
        data,
    })
}
// 请求用户数据
export function user(){
    return request({
        url:'/api/admin/user',
        method:'get',
    })

}
// 用户退出请求
export function logout(){
    return request({
        url:"/api/auth/logout",
        method:'post',
    })
}
