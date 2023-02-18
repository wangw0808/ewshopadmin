import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
import {renderIcon} from "@/utils";
import {JournalOutline} from "@vicons/ionicons5";

// 定义一个统一的路由名字
const routeName = 'order';
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
        path: '/order',
        // 因为在外面统一定义一个名称，所以直接使用routename
        name: routeName,
        // 指向的是layout下的index.ts
        component: Layout,
        redirect: '/order/list',
        meta: {
            title: '订单管理',
            // 图标
            icon: renderIcon(JournalOutline),
            // 排序
            sort: 0,
        },
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                meta: {
                    title: '订单列表',
                    icon: '',
                },
                component:()=>import("@/views/order/index.vue"),
            }
        ]
    }
];
export default routes;