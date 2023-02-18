import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue";
// 引入字体图标xicon
import {renderIcon} from "@/utils";
import {Browsers} from "@vicons/ionicons5"

// 定义一个统一的路由名字
const routeName = 'dashboard';

// 定义路由的类型是数组<泛型>
const routes:Array<RouteRecordRaw>=[
    {
        path: '/dashboard',
        // 因为在外面统一定义一个名称，所以直接使用routename
        name: routeName,
        // 指向的是layout下的index.ts
        component: Layout,
        redirect: '/dashboard/console',
        meta: {
            title: '首页统计',
            // 图标
            icon: renderIcon(Browsers),
            // 排序
            sort: 0,
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                meta: {
                    title: '主控台',
                    icon: '',
                },
                component:()=>import("@/views/dashboard/Dashboard.vue"),
            }
        ]
    }
];
export default routes;