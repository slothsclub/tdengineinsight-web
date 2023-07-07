<script setup>
import {computed, reactive, ref, watch} from "vue";
import useSql from "../../support/sql.js";
import {useSqlStore} from "../../store/sql.js";
import dayjs from "dayjs";
const {buildSimplePaginationSql} = useSql()
const sqlStore = useSqlStore()

const where = computed(() => {
  return sqlStore.where
})

const now = dayjs()
watch(where, () => {
  buildSimplePaginationSql()
}, {deep: true})
</script>

<template>
  <a-space>
    <a-input-group compact>
      <a-button disabled>{{ $t('common.timeRange') }}</a-button>
      <a-select v-model:value="sqlStore.where.mode">
        <a-select-option value="latest">{{ $t('common.latest') }}</a-select-option>
        <a-select-option value="custom">{{ $t('common.custom') }}</a-select-option>
        <a-select-option value="all">{{ $t('common.all') }}</a-select-option>
      </a-select>
      <a-input-number v-model:value="sqlStore.where.tsOffset.n" :min="0" v-if="sqlStore.where.mode === 'latest'"></a-input-number>
      <a-select v-model:value="sqlStore.where.tsOffset.unit" v-if="sqlStore.where.mode === 'latest'">
        <a-select-option value="s">{{ $tc('common.seconds', 2) }}</a-select-option>
        <a-select-option value="m">{{ $tc('common.minutes', 2) }}</a-select-option>
        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
        <a-select-option value="d">{{ $tc('common.days', 2) }}</a-select-option>
      </a-select>
      <a-range-picker v-model:value="sqlStore.where.timeRange" show-time v-if="sqlStore.where.mode === 'custom'" :default-value="[now.subtract(1, 'day'), now]"/>
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
