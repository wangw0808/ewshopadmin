import {defineStore} from "pinia";
import {login,user} from "../api/auth";

export interface IUserState{
    token:string,
    username:string,
    avatar_url:string,
    permissions:string[];
    info:any;
}

export const useUserStore = defineStore({
    id:'app-user',
    state:():IUserState => ({
        // 在页面刷新时已经保存token
    token:localStorage.getItem('token') || '',
    username:'',
    avatar_url:'',
    permissions:[],
    info:{},
}),
    getters:{
        // 接收
        getToken():string{
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
        }
    },
    actions:{
        setToken(token:string){
            localStorage.setItem('token',token);
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
        async login(userinfo:object){
            try{
                const response:any = await login(userinfo);

                if(response.access_token){
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
