<script setup>
import {ref} from "vue";
import useQueryBuilder from "../../support/query-builder.js";
import {PlusOutlined, DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons-vue";
import {useColumnStore} from "../../store/column.js";
import {useQueryBuilderStore} from "../../store/query-builder.js";

const {
  handleFunctionChanged,
  addColumn,
  removeColumn,
} = useQueryBuilder()
const columnStore = useColumnStore()
const queryBuilderStore = useQueryBuilderStore()
const {formatFunctionsForSelect, columns, columnsTotal } = queryBuilderStore
</script>

<template>
  <a-row class="select-clause-container">
    <a-col class="query-builder-column-item" :span="24" v-for="(column, index) in columns.items" :key="column._key" :class="{disabled: column.disabled}">
      <a-space>
        <a-input-group compact>
          <a-button disabled>{{ $t('common.function') }}</a-button>
          <a-select
              ref="select"
              v-model:value="column.func"
              style="width: 120px"
              :options="formatFunctionsForSelect"
              :field-names="{ label: 'name', value: 'id', options: 'children' }"
              @change="handleFunctionChanged"
          ></a-select>
        </a-input-group>

        <a-input-group compact>
          <a-button disabled>{{ $t('common.column') }}</a-button>
          <a-select v-model:value="column.name">
            <a-select-option :value="col.colName" v-for="col in columnStore.filteredColumns">{{ col.colName }}</a-select-option>
          </a-select>
        </a-input-group>

        <a-input-group compact>
          <a-button disabled>{{ $t('common.alias') }}</a-button>
          <a-input v-model:value="column.alias" :placeholder="column.name"/>
        </a-input-group>

        <a-button size="small" type="link" danger @click="removeColumn(index)" v-show="queryBuilderStore.columnsTotal > 1">
          <template #icon>
            <DeleteOutlined/>
          </template>
        </a-button>

        <a-tooltip>
          <template #title>{{ $t('ui.tips.invalidFunctionInWindowQueryMode') }}</template>
          <InfoCircleOutlined v-show="column.disabled" />
        </a-tooltip>
      </a-space>
    </a-col>
    <a-col :span="24">
      <a-button shape="round" size="small" @click="addColumn">
        <template #icon>
          <PlusOutlined/>
        </template>
      </a-button>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-select {
  min-width: 200px;
}

.ant-input-group-compact {
  display: flex;
}
.select-clause-container {
  width: 800px;
}
</style>
