<script setup>
import {OneToOneOutlined} from "@ant-design/icons-vue";
import {useColumnStore} from "../store/column.js";
import useColumn from "../support/column.js";

const {columnSelectorVisible, toggleColumnSelectorVisible} = useColumn()
const columnStore = useColumnStore()
</script>

<template>
  <a-dropdown class="" :visible="columnSelectorVisible" placement="bottomRight" overlayClassName="columns-selector">
    <template #overlay>
      <a-row>
        <a-typography-paragraph>{{ $t('ui.label.showOrHideColumnSelector') }}</a-typography-paragraph>
        <a-input v-model:value="columnStore.keyword" placeholder="Search by column name" />
        <a-list item-layout="vertical" :data-source="columnStore.filteredColumns" style="width: 200px">
          <template #renderItem="{ item }">
            <a-checkbox v-model:checked="item.checked" :disabled="item.colName === 'ts'">{{item.colName}}</a-checkbox>
          </template>
        </a-list>
        <a-button class="mrg-top" type="primary" block size="small" @click="toggleColumnSelectorVisible">{{ $t('common.ok') }}</a-button>
      </a-row>
    </template>
    <a-button @click="toggleColumnSelectorVisible">
      <OneToOneOutlined />
    </a-button>
  </a-dropdown>
</template>

<style scoped>

</style>
