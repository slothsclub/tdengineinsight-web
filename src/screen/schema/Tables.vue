<script setup>
import {ref} from "vue";
import {TableOutlined} from "@ant-design/icons-vue";
import InsStables from "./InsStables.vue";
import InsTables from "./InsTables.vue";

const activeKey = ref("stable");
</script>

<template>
  <a-row :gutter="[10, 0]" class="config-container">
    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="stable">
          <template #tab>
            <span>
              <TableOutlined/>
              Stables
            </span>
          </template>
          <InsStables />
        </a-tab-pane>
        <a-tab-pane key="table">
          <template #tab>
            <span>
              <TableOutlined/>
              Tables
            </span>
          </template>
          <InsTables />
        </a-tab-pane>
        <template #rightExtra>
          <a-button class="outline-primary">Create new {{activeKey}}</a-button>
        </template>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-typography {
  margin-bottom: 0 !important;
}
</style>
