<script setup>
import i18n from "../locale/i18n.js";
import {computed} from "vue";
import {useColumnStore} from "../store/column.js";
import useTag from "../support/tag.js";
import {useTagStore} from "../store/tag.js";
import {storeToRefs} from "pinia";
import {useTableStore} from "../store/table.js";

const columns = [
  {
    title: i18n.global.t('common.name'),
    dataIndex: 'colName'
  },
  {
    title: i18n.global.t('common.type'),
    dataIndex: 'colType'
  },
  {
    title: i18n.global.t('common.length'),
    dataIndex: 'colLength'
  },
  {
    title: i18n.global.t('common.precision'),
    dataIndex: 'colPrecision'
  },
  {
    title: i18n.global.t('common.scale'),
    dataIndex: 'colScale'
  },
  {
    title: i18n.global.t('common.nullable'),
    dataIndex: 'colNullable'
  },
]

const stableTagColumns = [
  {
    title: i18n.global.t('common.name'),
    dataIndex: 'tagName'
  },
  {
    title: i18n.global.t('common.type'),
    dataIndex: 'tagType'
  },
  {
    title: i18n.global.t('common.length'),
    dataIndex: 'tagLength'
  },
]

const childTableTagColumns = [
  {
    title: i18n.global.t('common.name'),
    dataIndex: 'tagName'
  },
  {
    title: i18n.global.t('common.type'),
    dataIndex: 'tagType'
  },
  {
    title: i18n.global.t('common.value'),
    dataIndex: 'tagValue'
  },
]

const columnStore = useColumnStore()
const {registerListener} = useTag()
const tagStore = useTagStore()
const {tags} = storeToRefs(tagStore)
const tableStore = useTableStore()

const data = computed(() => {
  return columnStore.columns.items
})
const tagColumns = computed(() => {
  return tableStore.mode === "stable" ? stableTagColumns : childTableTagColumns
})
const mode = computed(() => {
  return tableStore.mode
})

registerListener()
</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24">
      <a-card title="Columns" size="small">
        <a-table :dataSource="data" :columns="columns" size="small" :pagination="false" />
      </a-card>
    </a-col>
    <a-col :span="24" v-show="mode !== 'normalTable'">
      <a-card title="Tags" size="small">
        <a-table :dataSource="tags" :columns="tagColumns" size="small" :pagination="false" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
