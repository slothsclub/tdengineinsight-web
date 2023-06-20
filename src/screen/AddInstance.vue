<script setup>
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import InstanceCard from "../components/InstanceCard.vue";
import {ref} from "vue";
import InstanceForm from "../components/form/InstanceForm.vue";

const value = ref("")
const form = ref(null)

function onSearch() {}
const handleEdit = () => {
  form.value.edit({protocol: "TAOS-RS"})
}
</script>

<template>
  <InstanceForm ref="form" />
  <a-row>
    <a-col :span="14" :offset="5">
      <a-row>
        <a-col :span="12">
          <a-button type="primary" shape="round" size="large" @click="form.show()">
            <template #icon>
              <PlusCircleOutlined />
            </template>
            {{ $t("ui.btn.addInstance") }}
          </a-button>
        </a-col>
        <a-col :span="12" class="txt-right">
          <a-input-search
              v-model:value="value"
              :placeholder="$t('ui.placeholder.searchInstance')"
              style="width: 400px"
              @search="onSearch"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <br>
  <a-row>
    <a-col :span="14" :offset="5" class="instances-container">
      <InstanceCard v-for="i in 10" @edit="handleEdit"></InstanceCard>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="14" :offset="5">
      <div class="divider"></div>
      <a-card class="guide">
        <a-row :gutter="[0, 30]">
          <a-col :span="24" class="txt-center">
            <h2>{{$t('ui.tips.createTDengine')}}</h2>
          </a-col>
          <a-col :span="24">
            <a :href="$t('links.tdengineCloud.url')" target="_blank"><a-button type="primary" size="large">{{$t('links.tdengineCloud.title')}}</a-button></a>
            <a :href="$t('links.tdengineDocker')" target="_blank"><a-button type="primary" size="large">{{ $t('common.docker') }}</a-button></a>
            <a :href="$t('links.tdenginePackage')" target="_blank"><a-button type="primary" size="large">{{ $t('common.package') }}</a-button></a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>