<script setup>
import {computed, ref} from "vue";
import i18n from "../locale/i18n.js";

const props = defineProps({
  consumerGroup: {
    type: String
  }
})

const consumerGroup = computed(() => props.consumerGroup)

const data = [{
  consumer_id: 1,
  consumer_group: "",
  client_id: "",
  status: "",
  topics: "",
  up_time: "",
  subscribe_time: "",
  rebalance_time: ""
}, {
  consumer_id: 2,
  consumer_group: "",
  client_id: "",
  status: "",
  topics: "",
  up_time: "",
  subscribe_time: "",
  rebalance_time: ""
}];
const columns = [{
  title: i18n.global.t('common.consumerId'),
  dataIndex: 'consumer_id'
}, {
  title: i18n.global.t('common.consumerGroup'),
  dataIndex: 'consumer_group'
}, {
  title: i18n.global.t('common.clientId'),
  dataIndex: 'client_id'
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status'
}, {
  title: i18n.global.tc('common.topic', 2),
  dataIndex: 'topics'
}, {
  title: i18n.global.t('common.uptime'),
  dataIndex: 'up_time'
}, {
  title: i18n.global.t('common.subscribeTime'),
  dataIndex: 'subscribe_time'
}, {
  title: i18n.global.t('common.reBalanceTime'),
  dataIndex: 'rebalance_time'
}
];

const checked = ref(true)
</script>

<template>
  <a-row :gutter="[0, 5]">
    <a-col :span="24" class="txt-right">
      <a-checkbox v-model:checked="checked">{{ $t('common.autoRefresh') }}</a-checkbox>
    </a-col>
    <a-col :span="24">
      <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>

