<script setup>
import {reactive, ref, watch} from "vue";
import useSql from "../../support/sql.js";
import {useSqlStore} from "../../store/sql.js";
const {simplePaginationQuery} = useSql()
const sqlStore = useSqlStore()

const where = reactive({
  time: "10",
  unit: "m",
  limit: "50"
})

watch(where, () => {
  sqlStore.pagination.limit = where.limit
  sqlStore.where.tsOffset = where.time === '0' ? null : `${where.time}${where.unit}`
  console.log("where changed")
  simplePaginationQuery()
})
</script>

<template>
  <a-space>
    <a-input-group compact>
      <a-button disabled>{{ $t('common.latest') }}</a-button>
      <a-select v-model:value="where.time">
        <a-select-option value="5">5</a-select-option>
        <a-select-option value="10">10</a-select-option>
        <a-select-option value="20">20</a-select-option>
        <a-select-option value="0">{{ $t('common.none') }}</a-select-option>
      </a-select>
      <a-select v-model:value="where.unit" v-show="where.time !== '0'">
        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
      </a-select>
    </a-input-group>
    <a-input-group compact>
      <a-button disabled>{{ $t('common.numberOfRows') }}</a-button>
      <a-select v-model:value="where.limit">
        <a-select-option :value="n" v-for="n in sqlStore.pageSizeOptions">{{ n }}</a-select-option>
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