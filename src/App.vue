<script setup>
import {useAppStore} from "./store/app.js";
import {computed, createVNode} from "vue";
import {useRouter} from "vue-router";
import emitter from "./support/emitter.js";
import {Modal} from "ant-design-vue";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
import i18n from "./locale/i18n.js";

const appStore = useAppStore()
const loading = computed(() => {
  return appStore.globalSwitchInstance.loading
})
const router = useRouter()

emitter.on("DATASOURCE_NOT_FOUND", () => {
  Modal.confirm({
    title: i18n.global.t("common.error"),
    icon: createVNode(ExclamationCircleOutlined),
    content: i18n.global.t("ui.tips.missingDatasource"),
    onOk() {
      router.push({name: "instances"})
    },
    onCancel() {
    },
    closable: false,
    centered: true,
    width: 600,
    cancelText: i18n.global.t("common.later"),
    okText: i18n.global.t("common.ok"),
    okType: "primary"
  });
})
</script>

<template>
  <router-view id="main-container" class="" v-loading="loading"></router-view>
</template>

<style scoped>

</style>
