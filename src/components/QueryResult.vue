<script setup>

</script>

<template>
<div class="query-result">
  <a-alert :message="$t('ui.label.queryResult')" type="success" show-icon />
  <div class="sql-outer">
    SELECT * FROM `db_migration`
  </div>
</div>
</template>

<style scoped>

</style>