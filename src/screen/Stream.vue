<script setup>

import useStream from "../support/stream.js";
import SqlEditor from "../components/SqlEditor.vue";
import {useStreamStore} from "../store/stream.js";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import i18n from "../locale/i18n.js";

const streamStore = useStreamStore()
const {deleteStream, createStream, handleOpenCreateStream} = useStream()

const sqlPlaceholder = "CREATE STREAM [IF NOT EXISTS] stream_name [stream_options] INTO stb_name[(field1_name, ...)] [TAGS (create_definition [, create_definition] ...)] SUBTABLE(expression) AS subquery"
const columns = [{
  title: i18n.global.t('common.stream'),
  dataIndex: 'streamName'
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status'
}, {
  title: i18n.global.t('common.sourceDb'),
  dataIndex: 'sourceDb'
}, {
  title: i18n.global.t('common.targetDb'),
  dataIndex: 'targetDb'
}, {
  title: i18n.global.t('common.targetTable'),
  dataIndex: 'targetTable'
}, {
  title: i18n.global.t('common.watermark'),
  dataIndex: 'watermark'
}, {
  title: i18n.global.t('common.trigger'),
  dataIndex: 'trigger'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'createTime'
}, {
  title: i18n.global.t('common.sql'),
  dataIndex: 'sql'
}, {
  title: i18n.global.t('common.action'),
  key: 'action',
}
]
</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24" class="">
      <a-button @click="handleOpenCreateStream" type="primary">
        <template #icon>
          <PlusOutlined/>
        </template>
        {{ $t('ui.btn.createStream') }}
      </a-button>
    </a-col>
    <a-col :span="24">
      <a-table class="subscriptions-list" :columns="columns" :data-source="streamStore.streams.items" bordered
               :pagination="false" size="small">
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.dataIndex === 'sql'">
            <a-tooltip>
              <template #title>{{ text }}</template>
              {{ text.substring(0, 70) }}...
            </a-tooltip>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button size="small" danger @click="deleteStream(record)">
                <template #icon>
                  <DeleteOutlined/>
                </template>
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-col>

    <a-modal v-model:visible="streamStore.createStreamFormVisible" :title="$t('ui.btn.createStream')" @ok="createStream"
             :width="800" :okText="$t('common.create')" :confirm-loading="streamStore.streams.loading">
      <SqlEditor v-model="streamStore.sql" :rows="7" :placeholder="sqlPlaceholder"></SqlEditor>
    </a-modal>
  </a-row>
</template>

<style scoped>

</style>
