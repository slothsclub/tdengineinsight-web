<script setup>
import {SearchOutlined} from "@ant-design/icons-vue"
import SqlEditor from "../components/SqlEditor.vue";
import DataTableView from "../components/DataTableView.vue";
import QueryResult from "../components/QueryResult.vue";
import {ref} from "vue";

const querying = ref(false)
const hasResult = ref(false)
const doQuery = () => {
  querying.value = true
  hasResult.value = false
  setTimeout(() => {
    querying.value = false
    hasResult.value = true
  }, 1500)
}

</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24">
      <a-alert message="Connected to server 127.0.0.1:6030" type="info" show-icon />
    </a-col>
    <a-col :span="24">
      <SqlEditor></SqlEditor>
    </a-col>
    <a-col :span="24">
      <a-button type="primary" @click="doQuery" :loading="querying">
        <template #icon><SearchOutlined /></template>
        Query
      </a-button>
    </a-col>

    <a-col :span="24" class="mrg-top" v-if="hasResult">
      <QueryResult/>
    </a-col>
    <a-col :span="24" v-if="hasResult">
      <DataTableView/>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>