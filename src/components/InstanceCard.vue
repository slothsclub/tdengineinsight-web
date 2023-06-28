<template>
  <a-card class="instance-card" hoverable v-loading="localLoading" :class="{disabled: isLoadingOther}">
    <template #actions>
      <EditOutlined key="edit" @click="emit('edit', instance)"/>
      <DeleteOutlined key="setting" @click="handleDelete"/>
    </template>
    <a-card-meta :title="instance.name" :description="`${instance.host}:${instance.port}`" @click="open">

    </a-card-meta>
  </a-card>
</template>
<script setup>
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {Modal} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {computed, createVNode, reactive, ref, watch} from "vue";
import {useInstances} from "../support/instance.js"
import {useInstanceStore} from "../store/instance.js";
import i18n from "../locale/i18n.js";

const router = useRouter()
const props = defineProps(["instance"])
const emit = defineEmits(["edit", "open"])
const instance = reactive(props.instance)

const {openInstance, deleteInstance, queryInstances} = useInstances()
const instanceStore = useInstanceStore()
const isLoadingOther = computed(() => instanceStore.current.loading)
const localLoading = ref(false)
const open = () => {
  localLoading.value = true
  openInstance(instance).then(() => {

  }).finally(() => {
    localLoading.value = false
  })
}
const handleDelete = () => {
  Modal.confirm({
    title: i18n.global.t("ui.label.deleteDatabase"),
    icon: createVNode(ExclamationCircleOutlined),
    content: i18n.global.t("ui.tips.deleteDatabase", [instance.name]),
    onOk() {
      return new Promise((resolve, reject) => {
        instanceStore.formState.deleting = true
        deleteInstance(instance).then(() => {
          queryInstances()
          resolve()
        }, () => {
          reject()
        }).finally(() => {
          instanceStore.formState.deleting = false
        })
      })
    },
    onCancel() {
    },
    centered: true,
    maskClosable: true,
    width: 800,
    cancelText: i18n.global.t("common.no"),
    okText: i18n.global.t("common.yes"),
    okType: "primary",
    okButtonProps: {danger: "danger"}
  });
}
</script>
