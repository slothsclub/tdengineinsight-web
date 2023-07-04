<script setup>
import {TableOutlined, LeftOutlined, InsertRowLeftOutlined} from "@ant-design/icons-vue";
import {nextTick, onMounted, ref} from "vue";
import {useAppStore} from "../store/app.js";
import {useDatabaseStore} from "../store/database.js";
import {useTableStore} from "../store/table.js";
import useTable from "../support/table.js";
import {useRoute, useRouter} from "vue-router";
import useSql from "../support/sql.js";

const route = useRoute()
const activeTab = ref(route.query.activeTab || "stable")
const router = useRouter()
const appStore = useAppStore()
const databaseStore = useDatabaseStore()
const tableStore = useTableStore()
const {queryChildTables} = useTable()
const {resetSqlState} = useSql()

const switchToChildTablesView = (stable) => {
  tableStore.mode = "childTable"
  tableStore.currentStable.name = stable.stableName
  queryChildTables()
  redirect()
}
const handleStableSelect = (stable) => {
  tableStore.currentStable.name = stable.stableName
  redirect()
}
const handleChildTableSelect = (childTable) => {
  tableStore.currentChildTable.name = childTable.tableName
  redirect()
}
const handleNormalTableSelect = (normalTable) => {
  tableStore.currentNormalTable.name = normalTable.tableName
  tableStore.mode = 'normalTable'
  redirect()
}
const handleTabsChange = (k) => {
  resetSqlState()
  tableStore.mode = k
  redirect()
}
const backToStable = () => {
  tableStore.mode = "stable"
  tableStore.currentChildTable.name = null
  redirect()
}
const redirect = () => {
  router.push({
    name: "browser",
    query: {
      dbName: databaseStore.currentDatabase.name,
      stable: tableStore.currentStable.name,
      childTable: tableStore.currentChildTable.name,
      normalTable: tableStore.currentNormalTable.name,
      mode: tableStore.mode,
      activeTab: activeTab.value
    }
  })
}

onMounted(() => {
  nextTick(() => {
    const h = document.getElementsByClassName("sider")[0].clientHeight
    const dom = document.getElementsByClassName("table-list")
    Array.prototype.forEach.call(dom, function(el) {
      el.style.maxHeight = (h - el.getBoundingClientRect().top - 60) + 'px'
    })
  })
})
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
