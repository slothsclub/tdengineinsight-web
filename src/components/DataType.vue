<script setup>
import dataTypes from "../config/tdengine-data-type.js";
import _ from "lodash"
import {reactive, ref, watch} from "vue";

const props = defineProps({
  type: String,
  length: Number
})
const emit = defineEmits(['update:type', 'update:length'])

const userDefinedLength = ref(false)
const selected = reactive({
  type: "FLOAT",
  length: 4
})

watch(selected, () => {
  let t = _.find(dataTypes, {type: selected.type})
  userDefinedLength.value = t.length === "User Defined"
  if (!userDefinedLength.value) {
    selected.length = t.length
  }
  emit("update:type", selected.type)
  emit("update:length", selected.length)
})

watch(() => props.type, () => {
  selected.type = props.type
}, {immediate: true})
watch(() => props.length, () => {
  selected.length = props.length
}, {immediate: true})
</script>

<template>
  <a-input-group compact>
    <a-select v-model:value="selected.type">
      <a-select-option v-for="t in dataTypes" :value="t.type">{{ t.type }}</a-select-option>
    </a-select>
    <a-button disabled v-if="userDefinedLength">Length:</a-button>
    <a-input-number v-model:value="selected.length" v-if="userDefinedLength" :min="1" placeholder=""/>
  </a-input-group>
</template>

<style scoped>
.ant-select {
  min-width: 120px;
}
</style>
