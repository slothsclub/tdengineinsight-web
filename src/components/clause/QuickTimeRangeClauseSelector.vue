<script setup>
import {computed, reactive, ref, watch} from "vue";
import useSql from "../../support/sql.js";
import {useSqlStore} from "../../store/sql.js";
const {simplePaginationQuery} = useSql()
const sqlStore = useSqlStore()

const tsOffset = computed(() => {
  return sqlStore.where.tsOffset
})
const limit = computed(() => {
  return sqlStore.pagination.limit
})
watch([tsOffset, limit], () => {
  simplePaginationQuery()
}, {deep: true})
</script>

<template>
  <a-space>
    <a-input-group compact>
      <a-button disabled>{{ $t('common.latest') }}</a-button>
      <a-select v-model:value="sqlStore.where.tsOffset.n">
        <a-select-option value="5">5</a-select-option>
        <a-select-option value="10">10</a-select-option>
        <a-select-option value="20">20</a-select-option>
        <a-select-option value="0">{{ $t('common.none') }}</a-select-option>
      </a-select>
      <a-select v-model:value="sqlStore.where.tsOffset.unit" v-show="sqlStore.where.tsOffset.n !== '0'">
        <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
      </a-select>
    </a-input-group>
    <a-input-group compact>
      <a-button disabled>{{ $t('common.numberOfRows') }}</a-button>
      <a-select v-model:value="sqlStore.pagination.limit">
        <a-select-option :value="n" v-for="n in sqlStore.pageSizes">{{ n }}</a-select-option>
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
