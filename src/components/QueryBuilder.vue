<script setup>
  import {ref} from "vue";
  import {PlusOutlined} from '@ant-design/icons-vue';
  import SelectClauseBuilder from "./clause/SelectClauseBuilder.vue";
  import WindowClauseBuilder from "./clause/WindowClauseBuilder.vue";

  const value2 = ref()
  const getCurrentStyle = current => {
    const style = {};
    if (current.date() === 1) {
      style.border = '1px solid #1890ff';
      style.borderRadius = '50%';
    }
    return style;
  };

  const orderByColumn = ref("lucy")
  const orderByClasue = ref("desc")
  const limit = ref(100)
</script>

<template>
  <a-descriptions bordered>
    <a-descriptions-item label="Columns" :span="3">
      <SelectClauseBuilder></SelectClauseBuilder>
      <br>
      <br>
      <a-button shape="round" size="small">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-button>
    </a-descriptions-item>

    <a-descriptions-item :label="$t('common.timestamp')">
      <a-space>
        <a-range-picker v-model:value="value2">
          <template #dateRender="{ current }">
            <div class="ant-picker-cell-inner" :style="getCurrentStyle(current)">
              {{ current.date() }}
            </div>
          </template>
        </a-range-picker>
        <a-time-picker />
      </a-space>
    </a-descriptions-item>
    <a-descriptions-item :label="$t('common.orderBy')">
      <a-space>
        <a-select v-model:value="orderByColumn">
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="lucy2">Lucy 2</a-select-option>
        </a-select>
        <a-select v-model:value="orderByClasue">
          <a-select-option value="asc">ASC</a-select-option>
          <a-select-option value="desc">DESC</a-select-option>
        </a-select>
      </a-space>
    </a-descriptions-item>
    <a-descriptions-item :label="$t('common.limit')">
      <a-select v-model:value="limit">
        <a-select-option value="100">100</a-select-option>
        <a-select-option value="500">500</a-select-option>
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