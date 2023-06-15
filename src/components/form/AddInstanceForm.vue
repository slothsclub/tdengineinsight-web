<script setup>
import {computed, reactive, ref, toRaw} from "vue";

const editMode = ref(false)
const visible = ref(false);
const loading = ref(false);
const formState = reactive({
  protocol: 'TAOS',
  host: null,
  port: null,
  database: null,
  username: null,
  password: "",
  batchfetch: true,
  batchErrorIgnore: true,
  httpConnectTimeout: 5000,
  httpSocketTimeout: 5000,
  messageWaitTimeout: 3000
});

const show = () => {
  visible.value = true
  editMode.value = false
};
const edit = (instance) => {
  Object.assign(formState, instance)
  visible.value = true
  editMode.value = true
}

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
  }, 2000);
};
const handleCancel = () => {
  visible.value = false;
};


const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};

const title = computed(() => {
  return editMode.value ? "Edit TDengine Database" : "Add TDengine Database"
})

defineExpose({
  show,
  edit
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Add Database</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item label="Protocol">
        <a-radio-group v-model:value="formState.protocol" button-style="solid">
          <a-radio-button value="TAOS">Native</a-radio-button>
          <a-radio-button value="TAOS-RS">REST</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Host">
        <a-input v-model:value="formState.host" placeholder="localhost"/>
      </a-form-item>
      <a-form-item label="Port">
        <a-input-number v-model:value="formState.port" :min="2000" :max="65535" placeholder="6030"/>
      </a-form-item>
      <a-form-item label="Database">
        <a-input v-model:value="formState.database" placeholder="test"/>
      </a-form-item>

      <a-form-item label="Username">
        <a-input v-model:value="formState.username" placeholder="root"/>
      </a-form-item>
      <a-form-item label="Password">
        <a-input v-model:value="formState.password" placeholder="taosdata"/>
      </a-form-item>

      <a-form-item label="Batch fetch">
        <a-switch v-model:checked="formState.batchfetch"/>
      </a-form-item>
      <a-form-item label="Ignore batch error">
        <a-switch v-model:checked="formState.batchErrorIgnore"/>
      </a-form-item>

      <a-form-item label="HTTP connect timeout" v-if="formState.protocol === 'TAOS-RS'">
        <a-input v-model:value="formState.httpConnectTimeout"/>
      </a-form-item>
      <a-form-item label="HTTP socket timeout" v-if="formState.protocol === 'TAOS-RS' && !formState.batchfetch">
        <a-input v-model:value="formState.httpSocketTimeout"/>
      </a-form-item>
      <a-form-item label="Message wait timeout" v-if="formState.protocol === 'TAOS-RS' && formState.batchfetch">
        <a-input v-model:value="formState.messageWaitTimeout"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>