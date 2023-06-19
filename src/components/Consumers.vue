<script setup>
import {computed, ref} from "vue";

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
  title: 'Consumer ID',
  dataIndex: 'consumer_id'
}, {
  title: 'Consumer Group',
  dataIndex: 'consumer_group'
}, {
  title: 'Client ID',
  dataIndex: 'client_id'
}, {
  title: 'Status',
  dataIndex: 'status'
}, {
  title: 'Topics',
  dataIndex: 'topics'
}, {
  title: 'Up time',
  dataIndex: 'up_time'
}, {
  title: 'Subscribe time',
  dataIndex: 'subscribe_time'
}, {
  title: 'Rebalance time',
  dataIndex: 'rebalance_time'
}
];

const checked = ref(true)
</script>

<template>
  <a-row :gutter="[0, 5]">
    <a-col :span="24" class="txt-right">
      <a-checkbox v-model:checked="checked">Auto refresh</a-checkbox>
    </a-col>
    <a-col :span="24">
      <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>

