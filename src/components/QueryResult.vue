<script setup>
import {useSqlStore} from "../store/sql.js";
import {computed} from "vue";
import i18n from "../locale/i18n.js";

const sqlStore = useSqlStore()

const tip = computed(() => {
  return i18n.global.t('ui.label.queryResult', [sqlStore.pagination.offset, sqlStore.pagination.limit, sqlStore.execResult.total, sqlStore.execResult.elapsedTime])
})
</script>

<template>
<div class="query-result">
  <a-alert :message="tip" type="success" show-icon />
  <div class="sql-outer">
    {{ sqlStore.sql.rawSql }}
  </div>
</div>
</template>

<style scoped>

</style>