<script setup>
const props = defineProps(['items'])
</script>

<template>
  <a-descriptions class="configs" bordered size="small" :column="1">
    <a-descriptions-item v-for="item in props.items" :label="item.name">{{item.value}}</a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>
