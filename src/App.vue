<template>
  <div>
<!--    登陆成功信息组件-->
    <n-message-provider>
<!--      加载条-->
      <n-loading-bar-provider>
        <router-view></router-view>
      </n-loading-bar-provider>

    </n-message-provider>
  </div>
</template>

<script setup lang="ts">


</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
