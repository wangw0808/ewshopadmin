import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {Body} from "@vicons/ionicons5";
import {renderIcon} from "@/utils";

// 定义一个统一的路由名字
const routeName = 'users';
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.sort 排序越小越排前
 */


// 定义路由的类型是数组<泛型>
const routes:Array<RouteRecordRaw>=[
    {
        path: '/users',
        // 因为在外面统一定义一个名称，所以直接使用routename
        name: routeName,
        // 指向的是layout下的index.ts
        component: Layout,
        redirect: '/users/list',
        meta: {
            title: '用户管理',
            // 图标
            icon: renderIcon(Body),
            // 排序
            sort: 0,
        },
        // 子级路由
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                meta: {
                    title: '用户列表',
                    icon: '',
                },
                component:()=>import("@/views/user/index.vue"),
            }
        ]
    }
];
export default routes;