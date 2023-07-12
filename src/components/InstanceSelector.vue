<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      {{ currentInstance?.name }}
      <DownOutlined/>
    </a>
    <template #overlay>
      <a-menu class="database-dropdown-item">
        <a-menu-item key="0" @click="backToInstances">
          {{ $t('ui.label.allDatabase') }}
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item :key="instance.id" v-for="instance in instances" @click="switchInstance(instance)">
          {{ instance.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {DownOutlined} from '@ant-design/icons-vue';
import _ from "lodash"
import {useInstanceStore} from "../store/instance.js";
import {useInstances} from "../support/instance.js";
import {useRoute, useRouter} from "vue-router";
import {useAppStore} from "../store/app.js";

const route = useRoute()
const router = useRouter()
const {queryInstances, openInstance} = useInstances()
const instanceStore = useInstanceStore()
const appStore = useAppStore()

const instances = computed(() => {
  return instanceStore.allInstances.data
})
const currentInstance = computed(() => {
  return instanceStore.current.instance
})
const currentId = computed(() => {
  return route.params.id
})

onMounted(() => {
  if (instances.value.length === 0) {
    appStore.globalSwitchInstance.loading = true
    queryInstances()
  }
})

watch([currentId, instances], ([m, n]) => {
  if (m && n) {
    instanceStore.current.instance = _.find(instances.value, {id: m})
    appStore.globalSwitchInstance.loading = false
    !appStore.globalSwitchInstance.ready && openInstance(instanceStore.current.instance)
  }
})

const backToInstances = () => {
  router.push({name: "instances"})
}
const switchInstance = (instance) => {
  if (instance.id === appStore.currentInstanceId) return
  appStore.globalSwitchInstance.loading = true
  openInstance(instance).finally(() => {
    appStore.globalSwitchInstance.loading = false
  })
}
</script>
