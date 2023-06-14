<script setup>
import {ref} from "vue";
import {FileTextOutlined, ControlOutlined} from "@ant-design/icons-vue";
import Configs from "../components/Configs.vue";

const activeKey = ref("system");
</script>

<template>
  <a-row :gutter="[10, 0]" class="config-container">
    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="system">
          <template #tab>
            <span>
              <ControlOutlined/>
              System Configs
            </span>
          </template>
          <Configs/>
        </a-tab-pane>
        <a-tab-pane key="dnodes">
          <template #tab>
            <span>
              <FileTextOutlined/>
              DNode Configs: 201-3
            </span>
          </template>
          <Configs/>
        </a-tab-pane>

      </a-tabs>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-typography {
  margin-bottom: 0 !important;
}
</style>
