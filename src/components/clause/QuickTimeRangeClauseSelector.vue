<script setup>
import {ref} from "vue";

const time = ref(10)
const unit = ref("m")
const limit = ref(500)
</script>

<template>
  <a-space>
    <a-input-group compact>
      <a-button disabled>Latest</a-button>
      <a-select v-model:value="time">
        <a-select-option value="5">5</a-select-option>
        <a-select-option value="10">10</a-select-option>
        <a-select-option value="20">20</a-select-option>
      </a-select>
      <a-select v-model:value="unit">
        <a-select-option value="m">Minutes</a-select-option>
        <a-select-option value="h">Hours</a-select-option>
      </a-select>
    </a-input-group>
    <a-input-group compact>
      <a-button disabled>Number of rows</a-button>
      <a-select v-model:value="limit">
        <a-select-option value="500">500</a-select-option>
        <a-select-option value="1000">1000</a-select-option>
      </a-select>
    </a-input-group>
    <slot></slot>
  </a-space>
</template>

<style scoped>
.ant-select {
  min-width: 100px;
}
.ant-input-group-compact {
  display: flex;
}
</style>