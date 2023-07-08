<script setup>
import {computed, reactive, ref, watch} from "vue";
import useSql from "../../support/sql.js";
import {useSqlStore} from "../../store/sql.js";
import dayjs from "dayjs";
import {useTagStore} from "../../store/tag.js";
import {useTableStore} from "../../store/table.js";
import {typeDefine} from "../../config/type.js";
const {buildSimplePaginationSql} = useSql()
const sqlStore = useSqlStore()
const tagStore = useTagStore()
const tableStore = useTableStore()

const now = dayjs()

const where = computed(() => {
  return sqlStore.where
})
const limit = computed(() => {
  return sqlStore.pagination.limit
})
const handleTagChanged = () => {
  sqlStore.where.tag.values = []
}
const handleTagValuesChanged = () => {
  if(sqlStore.where.tag.values.length > 0) {
    buildSimplePaginationSql()
  }
}

watch([where, limit], () => {
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
    <a-input-group compact v-if="tableStore.mode === typeDefine.table.SUPER_TABLE">
      <a-button disabled>{{ $t('common.tag') }}</a-button>
      <a-select v-model:value="sqlStore.where.tag.name" class="tag-selector" @change="handleTagChanged">
        <a-select-option :value="null">{{$t('common.none')}}</a-select-option>
        <a-select-option :value="tag.tagName" v-for="tag in tagStore.allTags.items">{{ tag.tagName }}
        </a-select-option>
      </a-select>
      <a-select
          v-show="!!sqlStore.where.tag.name"
          v-model:value="sqlStore.where.tag.values"
          mode="multiple"
          style="width: 100%"
          :options="tagStore.valuesGroupByName[sqlStore.where.tag.name]"
          @change="handleTagValuesChanged"
      ></a-select>
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
