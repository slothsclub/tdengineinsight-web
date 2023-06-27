<script setup>
import {PlusCircleOutlined} from '@ant-design/icons-vue';
import InstanceCard from "../components/InstanceCard.vue";
import {onMounted, ref, watch} from "vue";
import InstanceForm from "../components/form/InstanceForm.vue";
import {useInstanceStore} from "../store/instance.js";
import {useInstances} from "../support/instance.js";

const instanceStore = useInstanceStore()
const {queryInstances, openInstance, deleteInstance} = useInstances()

const formRef = ref(null)

onMounted(() => {
  queryInstances()
})

const handleEdit = (instance) => {
  formRef.value.edit(instance)
}
const handleDelete = (instance) => {
  deleteInstance(instance)
}
const handleOpen = (instance) => {
  openInstance(instance)
}
</script>

<template>
  <InstanceForm ref="formRef"/>
  <a-row>
    <a-col :span="14" :offset="5">
      <a-row>
        <a-col :span="12">
          <a-button type="primary" shape="round" size="large" @click="formRef.add()">
            <template #icon>
              <PlusCircleOutlined/>
            </template>
            {{ $t("ui.btn.addInstance") }}
          </a-button>
        </a-col>
        <a-col :span="12" class="txt-right">
          <a-input-search
              v-model:value="instanceStore.filter"
              :placeholder="$t('ui.placeholder.searchInstance')"
              style="width: 400px"
          />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <br>
  <a-row>
    <a-col :span="14" :offset="5" class="instances-container">
      <a-skeleton active v-show="instanceStore.loading"/>
      <InstanceCard v-for="instance in instanceStore.instances" :instance="instance" :key="instance.id"
                    @edit="handleEdit" @delete="handleDelete" @open="handleOpen"></InstanceCard>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="14" :offset="5">
      <div class="divider"></div>
      <a-card class="guide">
        <a-row :gutter="[0, 30]">
          <a-col :span="24" class="txt-center">
            <h2>{{ $t('ui.tips.createTDengine') }}</h2>
          </a-col>
          <a-col :span="24">
            <a :href="$t('links.tdengineCloud.url')" target="_blank">
              <a-button type="primary" size="large">{{ $t('links.tdengineCloud.title') }}</a-button>
            </a>
            <a :href="$t('links.tdengineDocker')" target="_blank">
              <a-button type="primary" size="large">{{ $t('common.docker') }}</a-button>
            </a>
            <a :href="$t('links.tdenginePackage')" target="_blank">
              <a-button type="primary" size="large">{{ $t('common.package') }}</a-button>
            </a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>