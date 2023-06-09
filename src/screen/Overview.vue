<script setup>
import Separator from "../components/Separator.vue";
import ConnectionsChart from "../components/charts/ConnectionsChart.vue";
import QueriesChart from "../components/charts/QueriesChart.vue";
import TransChart from "../components/charts/TransChart.vue";
import SlowQueriesChart from "../components/charts/SlowQueriesChart.vue";

</script>

<template>
  <a-row :gutter="[0, 20]">
    <a-col :span="24">
      <a-typography-title :level="3">Database summary</a-typography-title>
      <a-descriptions bordered style="width: 600px" size="small" :column="2">
        <a-descriptions-item label="Cluster ID" :span="2">4578-45</a-descriptions-item>
        <a-descriptions-item label="Cluster Name" :span="2">Production</a-descriptions-item>
        <a-descriptions-item label="Created Time" :span="2">2010-10-10 10:10:10</a-descriptions-item>
        <a-descriptions-item label="MNode Endpoint" :span="2">
          <p>127.0.0.1</p>
          <p>127.0.0.2</p>
        </a-descriptions-item>
        <a-descriptions-item label="DNode Endpoint" :span="2">
          <p>127.0.0.3</p>
          <p>127.0.0.4</p>
          <p>127.0.0.5</p>
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
    <a-col :span="24">
      <a-card>
        <a-row justify="space-around">
          <a-statistic title="Connected Clients" :precision="0" :value="251"/>
          <Separator size="large"/>
          <a-statistic title="Connections" :precision="0" :value="2521"/>
          <Separator size="large"/>
          <a-statistic title="Current Requests" :precision="0" :value="2521"/>
          <Separator size="large"/>
          <a-statistic title="Total Requests" :precision="0" :value="1251"/>
          <Separator size="large"/>
          <a-statistic title="Slow queries" :precision="0" :value="2513"/>
          <Separator size="large"/>
          <a-statistic title="Uptime" :precision="1" :value="251" suffix="h"/>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="24" class="charts-container">
      <a-row justify="space-between">
        <ConnectionsChart />
        <QueriesChart />
        <TransChart />
        <SlowQueriesChart />
      </a-row>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
  .charts-container {
    margin-top: 30px;
    .ant-card {
      margin-bottom: 20px;
    }
  }
</style>
