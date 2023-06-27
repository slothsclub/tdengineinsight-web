<template>
  <a-card class="instance-card" hoverable>
    <template #actions>
      <EditOutlined key="edit" @click="emit('edit', instance)" />
      <SettingOutlined key="setting" @click="emit('delete', instance)" />
    </template>
    <a-card-meta :title="instance.name" :description="`${instance.host}:${instance.port}`" @click="emit('open', instance)">

    </a-card-meta>
  </a-card>
</template>
<script setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {reactive, watch} from "vue";
const router = useRouter()

const props = defineProps(["instance"])
const emit = defineEmits(["edit", "delete", "open"])
const instance = reactive(props.instance)
</script>
