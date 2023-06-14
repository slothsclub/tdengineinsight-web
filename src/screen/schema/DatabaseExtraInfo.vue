<script setup>
const props = defineProps(["database"])

const fields = [
  "buffer",
  "pagesize",
  "pages",
  "minrows",
  "maxrows",
  "comp",
  "retentions",
  "single_stable",
  "cachemodel",
  "cachesize",
  "wal_level",
  "wal_fsync_period",
  "wal_retention_period",
  "wal_retention_size",
  "wal_roll_period",
  "wal_segment_size",
  "stt_trigger",
  "table_prefix",
  "table_suffix",
  "tsdb_pagesize"
]
</script>

<template>
  <a-descriptions class="configs" size="small" :column="1">
    <a-descriptions-item v-for="field in fields" :label="field">{{ props.database[field] }}</a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>
