<script setup>
import {onMounted, ref, watch} from "vue";
import {FileTextOutlined, ControlOutlined} from "@ant-design/icons-vue";
import Configs from "../components/Configs.vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useMeta from "../support/meta.js";
import {useMetaStore} from "../store/meta.js";

const {queryConfigs, queryDNodesVariables} = useMeta()
const appStore = useAppStore()
const metaStore = useMetaStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)

const activeKey = ref("system")

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if (m && n) {
    queryConfigs()
    queryDNodesVariables()
  }
}, {immediate: true})
const handleChange = (key) => {

}
</script>

<template>
  <a-row :gutter="[10, 0]" class="config-container">
    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h" @change="handleChange">
        <a-tab-pane key="system">
          <template #tab>
            <span>
              <ControlOutlined/>
              {{ $t('ui.label.systemConfigs') }}
            </span>
          </template>
          <Configs :items="metaStore.data.configs"/>
        </a-tab-pane>
        <a-tab-pane :key="'dnodes-'+id" v-for="id in Object.keys(metaStore.groupDNodeVariables)">
          <template #tab>
            <span>
              <FileTextOutlined/>
              {{ $t('ui.label.dnodeConfigs', [id]) }}
            </span>
          </template>
          <Configs :items="metaStore.groupDNodeVariables[id]"/>
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
