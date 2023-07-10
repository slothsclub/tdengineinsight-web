<script setup>
import {ref} from "vue";
import {TableOutlined} from "@ant-design/icons-vue";
import InsStables from "./InsStables.vue";
import InsTables from "./InsTables.vue";
import CreateTableForm from "../../components/form/CreateTableForm.vue";
import {useSchemaStore} from "../../store/schema.js";
import {storeToRefs} from "pinia";
import useSchema from "../../support/schema.js";

const activeKey = ref("stable");
const schemaStore = useSchemaStore()
const {createTableFormRef} = storeToRefs(schemaStore)
const {handleTableViewChanged, showCreateTableForm, hideCreateTableForm} = useSchema()

</script>

<template>
  <a-row :gutter="[10, 0]" class="config-container">
    <a-col :span="24">
      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h" @change="handleTableViewChanged">
        <a-tab-pane key="stable">
          <template #tab>
            <span>
              <TableOutlined/>
              {{ $tc('common.stable', 2) }}
            </span>
          </template>
          <InsStables />
        </a-tab-pane>
        <a-tab-pane key="childAndNormalTable">
          <template #tab>
            <span>
              <TableOutlined/>
              {{ $tc('common.table', 2) }}
            </span>
          </template>
          <InsTables />
        </a-tab-pane>
        <template #rightExtra>
          <a-button class="outline-primary" @click="showCreateTableForm">{{ $t('ui.btn.createNewTable', [activeKey==='stable' ? $t('common.stable') : $t('common.normalTable')]) }}</a-button>
        </template>
      </a-tabs>
    </a-col>

    <CreateTableForm ref="createTableFormRef" :mode="activeKey" />
  </a-row>
</template>

<style scoped>
.ant-typography {
  margin-bottom: 0 !important;
}
</style>
