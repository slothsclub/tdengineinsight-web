<script setup>
import {computed, ref} from "vue";

const props = defineProps(["database"])
const visible = ref(false)

const fields = [
  "buffer",
  "pagesize",
  "pages",
  "minrows",
  "maxrows",
  "comp",
  "retentions",
  "singleStable",
  "cachemodel",
  "cachesize",
  "walLevel",
  "walFsyncPeriod",
  "walRetentionPeriod",
  "walRetentionSize",
  "walRollPeriod",
  "walSegmentSize",
  "sstTrigger",
  "tablePrefix",
  "tableSuffix",
  "tablePagesize"
]

const title = computed(() => {
  return props.database?.name
})

const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <a-drawer
      v-model:visible="visible"
      :title="title"
      placement="right"
  >
    <a-descriptions class="configs" size="small" :column="1">
      <a-descriptions-item v-for="field in fields" :label="field">{{ props.database[field] }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<style scoped>

</style>
