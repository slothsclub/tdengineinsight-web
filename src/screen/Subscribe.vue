<script setup>
import {FieldTimeOutlined, ConsoleSqlOutlined, DeleteOutlined} from "@ant-design/icons-vue"
import SubscriptionCard from "../components/SubscriptionCard.vue";
import Consumers from "../components/Consumers.vue";
import {ref} from "vue";

const data = [
  {
    topic_name: "Foo",
    db_name: "DB1",
    create_time: "2022-10-10 10:10:10",
    sql: "CREATE TOPIC [IF NOT EXISTS] topic_name AS subquery;"
  },
  {
    topic_name: "Bar",
    db_name: "DB2DB2DB2DB2DB2DB2",
    create_time: "2022-10-10 10:10:10",
    sql: "CREATE TOPIC [IF NOT EXISTS] topic_name AS subquery;"
  }
]

const selectedConsumerGroup = ref()
const onSelectSubscription = (item) => {
  selectedConsumerGroup.value = item
}
</script>

<template>
  <a-row :gutter="[20, 0]" class="flex-nowrap">
    <a-col style="min-width: 350px">
      <a-list size="middle" bordered :data-source="data" class="table-list">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a-button shape="circle" size="small" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </template>
            <a-list-item-meta>
              <template #title>
                {{ item.topic_name }}
              </template>
              <template #description>
                <div>{{ item.db_name }}</div>
                <a-space :size="15">
                  <div>
                    <FieldTimeOutlined/>
                    {{ item.create_time }}
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
          <a-typography-title :level="5">{{ $tc('common.topic', 2) }}</a-typography-title>
        </template>
      </a-list>
    </a-col>
    <a-col class="flex-grow">
      <a-row :gutter="[20, 10]">
        <a-col :span="24">
          <a-typography-title :level="5">{{ $tc('common.subscription', 2) }}</a-typography-title>
        </a-col>
        <SubscriptionCard v-for="i in 15" :class="{selected: i === selectedConsumerGroup}"
                          @selected="onSelectSubscription(i)"/>
      </a-row>
      <a-row class="mrg-top" v-show="selectedConsumerGroup">
        <a-divider></a-divider>
        <a-typography-title :level="5">{{ $tc('common.consumer', 2) }}</a-typography-title>
        <a-col :span="24">
          <Consumers/>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-typography {
  margin-bottom: 0;
}
</style>