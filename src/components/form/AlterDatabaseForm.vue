<script setup>
import {computed, reactive, ref, toRaw} from "vue";

const visible = ref(false);
const loading = ref(false);
const formState = reactive({
  cacheModel: "none",
  cacheSize: 1,
  buffer: 96,
  pages: null,
  replica: null,
  sttTrigger: null,
  walLevel: "2",
  walFsyncPeriod: null,
  keep: 3650,
  walRetentionPeriod: null,
  walRetentionSize: null,
});
const activeKey = ref("0")

const show = () => {
  visible.value = true
};
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

defineExpose({
  show
})
</script>

<template>
  <a-modal v-model:visible="visible" title="Alter Database" @ok="handleOk" :width="800"
           :bodyStyle="{height: '610px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Create Database</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item label="Cache Model">
        <a-radio-group v-model:value="formState.cacheModel" button-style="solid">
          <a-radio-button value="none">None</a-radio-button>
          <a-radio-button value="last_row">Last Row</a-radio-button>
          <a-radio-button value="last_value">Last Value</a-radio-button>
          <a-radio-button value="both">Both</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Cache Size" v-if="formState.cacheModel !== 'none'">
        <a-input-group compact>
          <a-input-number v-model:value="formState.cacheSize" :min="1" :max="65536" placeholder="1"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="Keep">
        <a-input-group compact>
          <a-input-number v-model:value="formState.keep" :min="1" :max="365000" placeholder="3650"/>
          <a-button disabled>Days</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="Buffer">
        <a-input-group compact>
          <a-input-number v-model:value="formState.buffer" :min="3" :max="16384" placeholder="3"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="WAL Level">
        <a-radio-group v-model:value="formState.walLevel" button-style="solid">
          <a-radio-button value="1">Level 1</a-radio-button>
          <a-radio-button value="2">Level 2</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="WAL_FSYNC_PERIOD">
        <a-input-group compact>
          <a-input-number v-model:value="formState.walFsyncPeriod" :min="0" :max="180000" placeholder="3000"/>
          <a-button disabled>ms</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="PAGES">
        <a-input-group compact>
          <a-input-number v-model:value="formState.pages" :min="64" placeholder="256"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="REPLICA">
        <a-radio-group v-model:value="formState.replica" button-style="solid">
          <a-radio-button value="1">1</a-radio-button>
          <a-radio-button value="3">3</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="STT_TRIGGER">
        <a-input-number v-model:value="formState.sttTrigger" :max="16" :min="1" placeholder="1"/>
      </a-form-item>

      <a-form-item label="WAL_RETENTION_PERIOD">
        <a-input-group compact>
          <a-input-number v-model:value="formState.walRetentionPeriod" :min="0" :max="16384" placeholder="0"/>
          <a-button disabled>s</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item label="WAL_RETENTION_SIZE">
        <a-input-group compact>
          <a-input-number v-model:value="formState.walRetentionSize" :min="0" placeholder="0"/>
          <a-button disabled>KB</a-button>
        </a-input-group>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<style scoped>

</style>