<script setup>
import {FieldTimeOutlined, ConsoleSqlOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue"
import {ref} from "vue";
import useSubscribe from "../support/subscribe.js";
import {useSubscribeStore} from "../store/subscribe.js";
import SqlEditor from "../components/SqlEditor.vue";
import i18n from "../locale/i18n.js";

const subscribeStore = useSubscribeStore()
const {createTopic, handleOpenCreateTopic, handleSelectTopic, deleteTopic, deleteSubscription} = useSubscribe()

const columns = [{
  title: i18n.global.t('common.topicName'),
  dataIndex: 'topicName'
}, {
  title: i18n.global.t('common.consumerGroup'),
  dataIndex: 'consumerGroup'
}, {
  title: i18n.global.t('common.vgroupId'),
  dataIndex: 'vgroupId'
}, {
  title: i18n.global.t('common.consumerId'),
  dataIndex: 'consumerId'
}, {
  title: i18n.global.t('common.offset'),
  dataIndex: 'offset'
}, {
  title: i18n.global.tc('common.row', 2),
  dataIndex: 'rows'
}, {
  title: i18n.global.t('common.action'),
  key: 'action',
}
]
</script>

<template>
  <a-row :gutter="[20, 0]" class="flex-nowrap">
    <a-col style="min-width: 350px">
      <a-list size="middle" bordered :data-source="subscribeStore.subscribe.topics" class="table-list">
        <template #renderItem="{ item }">
          <a-list-item :class="{selected: item.topicName+item.dbName === subscribeStore.selectedTopic?.topicName+subscribeStore.selectedTopic?.dbName}" @click="handleSelectTopic(item)">
            <template #actions>
              <a-button size="small" danger @click="deleteTopic(item)">
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </template>
            <a-list-item-meta>
              <template #title>
                {{ item.topicName }}
              </template>
              <template #description>
                <div>{{ item.dbName }}</div>
                <a-space :size="15">
                  <div>
                    <FieldTimeOutlined/>
                    {{ item.createTime }}
                  </div>
                  <a-tooltip>
                    <template #title>{{ item.sql }}</template>
                    <ConsoleSqlOutlined/>
                  </a-tooltip>
                </a-space>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>

        <template #header>
          <a-row>
            <a-col :span="12">
              <a-typography-title :level="5">{{ $tc('common.topic', 2) }}</a-typography-title>
            </a-col>
            <a-col :span="12" class="txt-right">
              <a-button @click="handleOpenCreateTopic">
                <template #icon>
                  <PlusOutlined />
                </template>
              </a-button>
            </a-col>
          </a-row>
        </template>
      </a-list>
    </a-col>
    <a-col class="flex-grow">
      <a-row :gutter="[20, 10]">
        <a-col :span="24">
          <a-typography-title :level="5">{{ $tc('common.subscription', 2) }}</a-typography-title>
        </a-col>
        <a-col :span="24">
          <a-table class="subscriptions-list" :columns="columns" :data-source="subscribeStore.subscriptions" bordered :pagination="false" size="small">
            <template #bodyCell="{ text, record, index, column }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a-button size="small" danger @click="deleteSubscription(record)">
                    <template #icon>
                      <DeleteOutlined />
                    </template>
                  </a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-col>

    <a-modal v-model:visible="subscribeStore.createTopicFormVisible" title="Create topic" @ok="createTopic" :width="800" :okText="$t('common.create')" :confirm-loading="subscribeStore.loadingState.creatingTopic">
      <SqlEditor v-model="subscribeStore.sql.topic" :rows="5" placeholder="CREATE TOPIC [IF NOT EXISTS] topic_name AS subquery;"></SqlEditor>
    </a-modal>
  </a-row>
</template>

<style scoped>
.ant-typography {
  margin-bottom: 0;
}
</style>
