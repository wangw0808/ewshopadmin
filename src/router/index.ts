import {createRouter,createWebHistory} from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/login/index.vue'

// 定义路由
// 每个路由都需要映射到一个组件。
const routes =[
    {path:'/',component:Home},
    {path:'/login',component:Login},
]
// 创建路由实例并传递routes配置
const router =createRouter({
    // 提供了 history 模式的实现,在这里使用 hash 模式。
    history:createWebHistory(),
    routes,//`routes: routes` 的缩写
})

router.beforeEach((to,from,next)=>{
    if(to.name != 'login'){
        if(!localStorage.getItem('token')){
            next({
                path:'login',
            })
        }
    }
    next();
})
export default router