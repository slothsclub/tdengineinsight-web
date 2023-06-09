<script setup>
import {useAppStore} from "../store/app.js";

const props = defineProps({
  title: String,
  description: String
})

const {pageInfo} = useAppStore()

</script>

<template>
  <div class="title-and-description">
    <span class="title">{{ $t(pageInfo.title) }}</span>
    <span class="description">{{ $t(pageInfo.description) }}</span>
  </div>
</template>

<style scoped>

</style>