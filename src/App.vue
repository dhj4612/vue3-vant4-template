<template>
  <van-nav-bar title="标题" left-arrow />
  <RouterView/>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref} from "vue";
import {helloApi, smsApi} from "@/api/index.js";

const active = ref(0)

const init = () => {
  smsApi({
    phone: '18781075421'
  }).then(r => console.log(r))
}
</script>

<style scoped>
</style>
