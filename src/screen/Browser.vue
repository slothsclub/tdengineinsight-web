<script setup>
import { TableOutlined, OneToOneOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons-vue';
import {ref} from "vue";
import TableList from "../components/TableList.vue";
import DataTableView from "../components/DataTableView.vue";
import QueryResult from "../components/QueryResult.vue";
import TableStructure from "../components/TableStructure.vue";
import TablePrivileges from "../components/TablePrivileges.vue";
import QueryBuilder from "../components/QueryBuilder.vue";
import QuickTimeRangeClauseSelector from "../components/clause/QuickTimeRangeClauseSelector.vue";
const val = ref("db2")
const activeKey = ref("1")
const viewMode = ref("a")
</script>

<template>
  <a-row :gutter="[0, 0]" class="min-h browser-container">
    <a-col class="browser-schema-container">
      <a-select size="large" v-model:value="val">
        <a-select-option value="db1">DB1</a-select-option>
        <a-select-option value="db2">DB2</a-select-option>
        <a-select-option value="db3">DB3</a-select-option>
      </a-select>

      <TableList></TableList>
    </a-col>
    <a-col class="browser-data-container">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <TableOutlined />
              Browse
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
                    <a-button>Refresh</a-button>
                  </QuickTimeRangeClauseSelector>
                </a-col>
                <a-col :span="6" class="txt-right">
                  <a-radio-group v-model:value="viewMode" button-style="solid">
                    <a-radio-button value="a">Table</a-radio-button>
                    <a-radio-button value="b">Chart</a-radio-button>
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
              Structure
            </span>
          </template>
          <TableStructure/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
            <span>
              <SearchOutlined />
              Search
            </span>
          </template>
          <a-row :gutter="[0, 20]">
            <a-col :span="24">
              <QueryBuilder />
              <a-button class="mrg-top" size="large" style="width: 200px">Query</a-button>
            </a-col>
            <a-col :span="24">
              <QueryResult />
            </a-col>
            <a-col :span="24">
              <DataTableView />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="4">
          <template #tab>
            <span>
              <UserOutlined />
              Privileges
            </span>
          </template>
          <TablePrivileges />
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
