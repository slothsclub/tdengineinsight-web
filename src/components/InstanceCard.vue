<template>
  <a-card class="instance-card" hoverable>
    <template #actions>
      <EditOutlined key="edit" @click="emit('edit')" />
      <SettingOutlined key="setting" />
    </template>
    <a-card-meta title="Localost" description="127.0.0.1:6030" @click="openInstance">

    </a-card-meta>
  </a-card>
</template>
<script setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
const router = useRouter()

const emit = defineEmits(["edit"])
const openInstance = () => {
  router.push({name: "overview", params: {id: 1}})
}
</script>