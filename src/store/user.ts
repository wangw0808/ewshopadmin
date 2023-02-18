import {defineStore} from "pinia";
import {login,user} from "@/api/auth";

// 定义store的类型
export interface IUserState{
    // 保存的状态或定义的一些属性

    token:string,
    username:string,
    avatar_url:string,
    permissions:string[];
    info:any;
}

// 定义一个数据模型
// defineStore是从怕pinia中导入的
export const useUserStore = defineStore({
    id:'app-user',
    state:():IUserState => ({
        // 在页面刷新时已经保存token，登录成功后返回token
        // pinia是一个状态管理，用来保存一些属性的状态或者对象的状态
    token:localStorage.getItem('token') || '',
    username:'',
        // 用户头像
    avatar_url:'',
        // 用户权限
    permissions:[],
        // 用户信息
    info:{},
}),
    // 取得状态里面的值
    getters:{
        // 接收状态里面的值
        // 返回的是一个字符串，:string是方法或函数的返回值类型
        // 可以接受服务器返回的token
        getToken():string{
            // 方法体或方法的实现

            // 返回的是useUserStore数据模型里面的token
            return this.token;
        },
        getAvatar():string{
            return this.avatar_url;
        },
        getUserName():string{
            return this.username;
        },
        getPermissions():string[]{
            return this.permissions;
        },
        async getUserInfo():Promise<object>{
            // 判断this.info是否是空对象或是不存在，不存在时调用getUser方法
            if(this.info?.id){
                await useUserStore().getUser();
            }
            return this.info;
        }
    },
    // 给状态设置值
    actions:{
        // 调用settoken方法，传一个token
        // 函数(形参:形参的类型)
        // 接收从login方法中传过来的token
        setToken(token:string){
            // 在本地存储一下token
            // token的值是token，是以键值对的形式出现的
            // 'token'在应用中里面的值就是token
            localStorage.setItem('token',token);
            // 把token赋值给当前对象的token(useUserStore数据模型里面的token)
            this.token = token;
        },
        setAvatar(avatar_url:string){
            this.avatar_url = avatar_url;
        },
        setUserInfo(info:object){
            this.info = info;
        },
        setUserName(username:string){
            this.username = username;
        },
        setPermissions(permissions:string[]){
            this.permissions = permissions;
        },
        // 异步登录的方法
        // 接收从login/index.vue里面传递过来的params{password,username}
        async login(userinfo:object){
            // login的方法实现
            try{
                // login是从auth导入的login
                // 把userinfo传给auth里面login方法的data里面
                const response:any = await login(userinfo);
                // 请求后台的token是access-token
                if(response.access_token){
                    // 把请求后台数据的token传给settoken方法
                    // settoken是actions里面的
                    this.setToken(response.access_token);
                    // 登录之后,token已经拿到了，然后getuser获取调用
                    return await this.getUser();
                }
            }catch(error){
                console.log(error);
            }
        },
        async getUser(){
            try{
                const response:any = await user();
                this.setUserInfo(response);
                this.setAvatar(response.avatar_url);
                this.setUserName(response.name);
                return response;
            }catch (error){

            }
        }
    }
})
