<script setup>
import {useAppStore} from "./store/app.js";
import {computed} from "vue";

const appStore = useAppStore()
const loading = computed(() => {
  return appStore.globalSwitchInstance.loading
})
</script>

<template>
  <router-view id="main-container" class="" v-loading="loading"></router-view>
</template>

<style scoped>

</style>
