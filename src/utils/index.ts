import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "vue";

export const renderIcon = (icon:Component):Component => {
    return ()=> h (NIcon,null,{default:()=> h(icon)});
}

// 地柜组装菜单格式
export function generatorMenu(routerMap:Array<any>){
    // routerMap按照sort排序
    routerMap.sort((a,b)=> a.meta.sort-b.meta.sort);
    const result = routerMap.map((item)=> {
        // 判断item.menu是否在permissions中，如果不存在则跳过
        const menu:{label:any,key:any,icon:any,children:any}={
            // 按照naive-ui中的菜单组件的代码格式，生成想要生成的卡片
            label:item?.meta?.title,
            key:item?.name,
            icon:item.meta?.icon,
            children:item?.meta.children,
        };
        if(item.children && item.children.length > 1){//有子元素并且长度大于1，不止一个
            menu.children = generatorMenu(item.children);
        }else if(item.children && item.children.length === 1){
            menu.key = item?.children[0].name;
        }
        return menu;
    })
    // 去除result  null
    return result;
}