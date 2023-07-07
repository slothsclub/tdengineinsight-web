<script setup>
import {ref} from "vue";
import SelectClauseBuilder from "./clause/SelectClauseBuilder.vue";
import WindowClauseBuilder from "./clause/WindowClauseBuilder.vue";
import dayjs from "dayjs";
import {useQueryBuilderStore} from "../store/query-builder.js";
import {storeToRefs} from "pinia";

const queryBuilderStore = useQueryBuilderStore()
const {
  timestamp,
  orderBy,
  limitOptions,
  limit,
  defaultTimestampRange,
} = storeToRefs(queryBuilderStore)

const handleRangePickerChanged = () => {

}
</script>

<template>
  <a-descriptions bordered>
    <a-descriptions-item label="Columns" :span="3">
      <SelectClauseBuilder></SelectClauseBuilder>
    </a-descriptions-item>

    <a-descriptions-item :label="$t('common.timestamp')">
      <a-range-picker v-model:value="timestamp" :show-time="{defaultValue: defaultTimestampRange.end}" @change="handleRangePickerChanged"
                      :default-value="[defaultTimestampRange.start, defaultTimestampRange.end]"/>
    </a-descriptions-item>
    <a-descriptions-item :label="$t('common.orderBy')">
      <a-space>
        <a-select v-model:value="orderBy.column">
          <a-select-option value="none">None</a-select-option>
          <a-select-option value="ts">ts</a-select-option>
          <a-select-option value="_wstart">_WSTART</a-select-option>
          <a-select-option value="_wend">_WEND</a-select-option>
        </a-select>
        <a-select v-model:value="orderBy.direction">
          <a-select-option value="none">None</a-select-option>
          <a-select-option value="asc">ASC</a-select-option>
          <a-select-option value="desc">DESC</a-select-option>
        </a-select>
      </a-space>
    </a-descriptions-item>
    <a-descriptions-item :label="$t('common.limit')">
      <a-select v-model:value="limit">
        <a-select-option :value="n" v-for="n in limitOptions">{{ n }}</a-select-option>
      </a-select>
    </a-descriptions-item>

    <a-descriptions-item :label="$t('common.timeWindow')" :span="3">
      <WindowClauseBuilder/>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>
.ant-select {
  min-width: 100px;
}
</style>