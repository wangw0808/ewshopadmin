import request from "../utils/request";

// 对外第二次暴露

// 登录接口
export function login(data:object){
    // return的是一个promise对象
    return request({
        url:'/api/auth/login',
        method:"post",
        data,
    })
}

export function user(){
    return request({
        url:'/api/admin/user',
        method:'get',
    })

}
