<script setup>
import {ref, watch} from "vue";
import DNodesList from "../components/DNodesList.vue";
import QNodesList from "../components/QNodesList.vue";
import MNodesList from "../components/MNodesList.vue";
import ClusterInfo from "../components/ClusterInfo.vue";
import {PartitionOutlined, ClusterOutlined} from "@ant-design/icons-vue";

const activeKey = ref('cluster')
</script>

<template>
  <a-row :gutter="[10, 0]" class="cluster-container">

    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="cluster">
          <template #tab>
            <span>
              <ClusterOutlined />
              {{ $t('common.cluster') }}
            </span>
          </template>
          <ClusterInfo/>
        </a-tab-pane>
        <a-tab-pane key="mnodes">
          <template #tab>
            <span>
              <PartitionOutlined />
              {{ $t('tdengine.label.mnodes') }}
            </span>
          </template>
          <MNodesList/>
        </a-tab-pane>
        <a-tab-pane key="dnodes">
          <template #tab>
            <span>
              <PartitionOutlined />
              {{ $t('tdengine.label.dnodes') }}
            </span>
          </template>
          <DNodesList/>
        </a-tab-pane>
        <a-tab-pane key="qnodes">
          <template #tab>
            <span>
              <PartitionOutlined />
              {{ $t('tdengine.label.qnodes') }}
            </span>
          </template>
          <QNodesList/>
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
