<script setup>
import {ref} from "vue";

const func = ref("avg")
const column = ref("col1")
const alias = ref("")
</script>

<template>
<a-space>
  <a-input-group compact>
    <a-button disabled>Function</a-button>
    <a-select v-model:value="func">
      <a-select-option value="avg">AVG</a-select-option>
      <a-select-option value="count">COUNT</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact>
    <a-button disabled>Column</a-button>
    <a-select v-model:value="column">
      <a-select-option value="col1">Col 1</a-select-option>
      <a-select-option value="col2">Col 2</a-select-option>
      <a-select-option value="col3">Col 3</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact>
    <a-button disabled>Alias</a-button>
    <a-input v-model:value="alias" placeholder="" />
  </a-input-group>
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