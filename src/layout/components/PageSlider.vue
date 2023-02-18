<template>
  <div class="pt-4">
    <div class="m-0">
      <img style="margin:auto" src="@/assets/images/logo.png" alt="logo">
    </div>
    <n-menu :options="menuOptions"  :value="defaultKey" inverted @update:value="handleUpdateValue" />
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,h,Component} from "vue";
import {useRoute,useRouter} from "vue-router";
import {routeModuleList} from "@/router";
// 是从utils/index中传过来的
import {generatorMenu} from "@/utils";
// 引入菜单组件,把component组件传给icon

const defaultKey = ref('');

onMounted(()=>{
  const route = useRoute();
  // 获取当前路由的key
  const routeKey = route.name;
  if(typeof routeKey === 'string'){
    defaultKey.value = routeKey;
  }
});
const router = useRouter();
const menuOptions = generatorMenu(routeModuleList)
const handleUpdateValue = (key)=> {
  console.log('11111')
  defaultKey.value=key;
  router.push({name:key});
}


</script>

<style scoped>

</style>