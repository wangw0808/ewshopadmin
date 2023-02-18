<template>
  <div class="w-full h-14 flex items-center  overflow-hidden justify-end px-8 shadow shadow-md shadow-sky-500"   style="border-bottom: 1px solid #ccc">
    <!-- 头像 -->
    <n-dropdown :options="options" @select="select">
      <div class="flex items-center">
        <n-avatar
            round
            size="small"
            :src="userStore.getAvatar"
        />
        <span class="pl-2">{{userStore.getUserName}}</span>
        <!--                        超级管理员-->
      </div>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,} from"vue";
import {useRoute,useRouter} from "vue-router";
import {routeModuleList} from "@/router";
import {renderIcon} from "@/utils";
// 引入退出方法
import {logout} from "@/api/auth";
import {LogOutOutline as LogoutIcon} from "@vicons/ionicons5";
import {useUserStore} from "@/store/user";
// 接收从store/user里面传过来的useUserStore
const userStore = useUserStore();
userStore.getUserInfo;

const options:any =ref([
  {
    label:'退出登录',
    key:'logout',
    // 引入退出登录的图标
    icon:renderIcon(LogoutIcon)
  }
]);

const select = (key:string)=>{
  switch (key){
    case 'logout':
      logout().then(() => {
        localStorage.removeItem('token');
        window.location.reload();
      });
      break;
    default:
      break;
  }
}


</script>

<style scoped>

</style>