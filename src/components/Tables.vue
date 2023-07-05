<script setup>
import {TableOutlined, LeftOutlined, InsertRowLeftOutlined} from "@ant-design/icons-vue";
import {nextTick, onMounted, ref} from "vue";
import {useTableStore} from "../store/table.js";
import useTable from "../support/table.js";

const tableStore = useTableStore()
const {
  activeTab,
  switchToChildTablesView,
  handleStableSelect,
  handleChildTableSelect,
  handleNormalTableSelect,
  handleTabsChange,
  backToStable,
} = useTable()
</script>

<template>
  <a-row class="meta-tables mrg-top">
    <a-tabs v-model:activeKey="activeTab" type="card" class="tabs min-h" @change="handleTabsChange">
      <a-tab-pane key="stable">
        <template #tab>
            <span>
              <InsertRowLeftOutlined />
              {{ $t('common.stable') }}
            </span>
        </template>
        <a-input-search
            v-model:value="tableStore.filter.stableKeyword"
            :placeholder="$t('ui.placeholder.searchStables')"
        />
        <a-list item-layout="horizontal" :data-source="tableStore.stables" class="table-list mrg-top stables" v-show="tableStore.mode === 'stable'" :loading="tableStore.loadingState.stable">
          <template #renderItem="{ item }">
            <a-list-item :class="{selected: item.stableName === tableStore.currentStable.name}">
              <template #actions>
                <a-tooltip>
                  <template #title>{{ $t('ui.tips.viewChildTables') }}</template>
                  <TableOutlined @click="switchToChildTablesView(item)" />
                </a-tooltip>
              </template>
              <a-list-item-meta
                  @click="handleStableSelect(item)"
                  :description="item.tableComment"
              >
                <template #title>
                  {{ item.stableName }}
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

        <a-button class="mrg-top" @click="backToStable" v-show="tableStore.mode === 'childTable'">
          <template #icon>
            <LeftOutlined />
          </template>
          {{ $t('ui.btn.backupToStables') }}
        </a-button>
        <a-alert class="mrg" :message="$t('ui.tips.tooMuchChildTables', [100])" type="warning" show-icon v-if="tableStore.isTooMuchChildTables" />
        <a-list item-layout="horizontal" :data-source="tableStore.childTables" class="table-list child-tables" v-show="tableStore.mode === 'childTable'" :loading="tableStore.loadingState.childTable">
          <template #renderItem="{ item }">
            <a-list-item :class="{selected: item.tableName === tableStore.currentChildTable.name}">
              <a-list-item-meta
                  @click="handleChildTableSelect(item)"
                  :description="item.tableComment"
              >
                <template #title>
                  {{ item.tableName }}
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

      </a-tab-pane>
      <a-tab-pane key="normalTable">
        <template #tab>
            <span>
              <TableOutlined />
              {{ $t('common.table') }}
            </span>
        </template>

        <a-input-search
            v-model:value="tableStore.filter.normalTableKeyword"
            :placeholder="$t('ui.placeholder.searchStables')"
        />
        <a-list item-layout="horizontal" :data-source="tableStore.normalTables" class="table-list mrg-top stables" v-show="tableStore.mode === 'normalTable'" :loading="tableStore.loadingState.normalTable">
          <template #renderItem="{ item }">
            <a-list-item :class="{selected: item.tableName === tableStore.currentNormalTable.name}">
              <a-list-item-meta
                  @click="handleNormalTableSelect(item)"
                  :description="item.tableComment"
              >
                <template #title>
                  {{ item.tableName }}
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

      </a-tab-pane>
    </a-tabs>
  </a-row>
</template>

<style scoped>

</style>
