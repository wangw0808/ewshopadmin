import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/login/index.vue'
import dashboard from "@/router/modules/dashboard";

// 匹配所有子级路由
const modules:any = import.meta.glob('./modules/**/*.ts',{eager:true});
const routeModuleList:RouteRecordRaw[]=[];

Object.keys(modules).forEach((key)=> {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod]:[mod];
    routeModuleList.push(...modList);
})

console.log(routeModuleList)

// 定义路由
// 每个路由都需要映射到一个组件。
const routes =[
    {path:'/',component:Home},
    {path:'/login',name:'login',component:Login,meta:{title:'登录'}},
    //在router的index.ts的表单验证中需要登录之后跳转到首页用的是name，所以需要设置一个name
]
const baseRoutes = [...routes,...routeModuleList];

// 创建路由实例并传递routes配置
const router =createRouter({
    // 提供了 history 模式的实现,在这里使用 hash 模式。
    history:createWebHistory(),
    //`routes: routes` 的缩写是routes
    routes:baseRoutes,
})

router.beforeEach((to,from,next)=>{
    //判断是不是登录页面
    if(to.name != 'login'){
        //判断是否登陆
        if(!localStorage.getItem('token')){
            next({
                path:'login',
            })
        }
    }
    next();
})
export {routeModuleList};
export default router