<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import i18n from "../../locale/i18n.js";

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
  return editMode.value ? i18n.global.t('ui.label.form.editDatabase') : i18n.global.t('ui.label.form.addDatabase')
})

defineExpose({
  show,
  edit
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ $t('ui.btn.addDatabase') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 10 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item :label="$t('common.protocol')">
        <a-radio-group v-model:value="formState.protocol" button-style="solid">
          <a-radio-button value="TAOS">{{ $t('common.native') }}</a-radio-button>
          <a-radio-button value="TAOS-RS">{{ $t('common.rest') }}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('common.host')">
        <a-input v-model:value="formState.host" placeholder="localhost"/>
      </a-form-item>
      <a-form-item :label="$t('common.port')">
        <a-input-number v-model:value="formState.port" :min="2000" :max="65535" placeholder="6030"/>
      </a-form-item>
      <a-form-item :label="$t('common.database')">
        <a-input v-model:value="formState.database" placeholder="test"/>
      </a-form-item>

      <a-form-item :label="$t('common.username')">
        <a-input v-model:value="formState.username" placeholder="root"/>
      </a-form-item>
      <a-form-item :label="$t('common.password')">
        <a-input v-model:value="formState.password" placeholder="taosdata"/>
      </a-form-item>

      <a-form-item :label="$t('common.batchFetch')">
        <a-switch v-model:checked="formState.batchfetch"/>
      </a-form-item>
      <a-form-item :label="$t('common.ignoreBatchError')">
        <a-switch v-model:checked="formState.batchErrorIgnore"/>
      </a-form-item>

      <a-form-item :label="$t('common.httpConnectTimeout')" v-if="formState.protocol === 'TAOS-RS'">
        <a-input v-model:value="formState.httpConnectTimeout"/>
      </a-form-item>
      <a-form-item :label="$t('common.httpSocketTimeout')" v-if="formState.protocol === 'TAOS-RS' && !formState.batchfetch">
        <a-input v-model:value="formState.httpSocketTimeout"/>
      </a-form-item>
      <a-form-item :label="$t('common.messageWaitTimeout')" v-if="formState.protocol === 'TAOS-RS' && formState.batchfetch">
        <a-input v-model:value="formState.messageWaitTimeout"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
