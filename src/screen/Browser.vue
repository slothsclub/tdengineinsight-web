<script setup>
import { TableOutlined, OneToOneOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import {computed, ref, watch} from "vue";
import Tables from "../components/Tables.vue";
import DataTableView from "../components/DataTableView.vue";
import QueryResult from "../components/QueryResult.vue";
import TableStructure from "../components/TableStructure.vue";
import QueryBuilder from "../components/QueryBuilder.vue";
import QuickTimeRangeClauseSelector from "../components/clause/QuickTimeRangeClauseSelector.vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useDatabase from "../support/database.js";
import {useDatabaseStore} from "../store/database.js";
const activeKey = ref("1")
const viewMode = ref("a")

const appStore = useAppStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)

const {queryDatabases} = useDatabase(true)
const databaseStore = useDatabaseStore()

const noDatabase = computed(() => {
  return databaseStore.databases.userDefined.length === 0
})
</script>

<template>
  <a-row :gutter="[0, 0]" class="min-h browser-container">
    <a-col :span="24" v-if="noDatabase">
      <a-empty class="center mrg-top" :description="$t('ui.tips.noDatabaseFound')" />
    </a-col>
    <a-col v-show="!noDatabase" class="browser-schema-container">
      <a-select size="large" v-model:value="databaseStore.currentDatabase.name">
        <a-select-option v-for="db in databaseStore.databases.userDefined" :value="db.name">{{ db.name }}</a-select-option>
      </a-select>

      <Tables></Tables>
    </a-col>
    <a-col v-show="!noDatabase" class="browser-data-container">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <TableOutlined />
              {{ $t('common.browse') }}
            </span>
          </template>
          <a-row :gutter="[0, 20]">
            <a-col :span="24">
              <QueryResult/>
            </a-col>
            <a-col :span="24">
              <a-row>
                <a-col :span="18">
                  <QuickTimeRangeClauseSelector>
                    <a-button>{{ $t('common.refresh') }}</a-button>
                  </QuickTimeRangeClauseSelector>
                </a-col>
                <a-col :span="6" class="txt-right">
                  <a-radio-group v-model:value="viewMode" button-style="solid">
                    <a-radio-button value="a">{{ $t('common.table') }}</a-radio-button>
                    <a-radio-button value="b">{{ $t('common.chart') }}</a-radio-button>
                  </a-radio-group>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24">
              <DataTableView></DataTableView>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span>
              <OneToOneOutlined />
              {{ $t('common.structure') }}
            </span>
          </template>
          <TableStructure/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
            <span>
              <SearchOutlined />
              {{ $t('common.search') }}
            </span>
          </template>
          <a-row :gutter="[0, 20]">
            <a-col :span="24">
              <QueryBuilder />
              <a-button class="mrg-top" size="large" style="width: 200px">{{ $t('common.query') }}</a-button>
            </a-col>
            <a-col :span="24">
              <QueryResult />
            </a-col>
            <a-col :span="24">
              <DataTableView />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<style scoped>
  .browser-container {
    flex-wrap: nowrap;
  }
  .ant-select {
    min-width: 100px;
    width: 100%;
  }
  .ant-card {
    min-height: 100%;
  }
</style>
