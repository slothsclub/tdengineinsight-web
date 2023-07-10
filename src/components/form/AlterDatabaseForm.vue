<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import useSchema from "../../support/schema.js";
import {useSchemaStore} from "../../store/schema.js";
import {storeToRefs} from "pinia";

const {alterDatabase} = useSchema()
const schemaStore = useSchemaStore()
const formState = computed(() => {
  return schemaStore.databaseStruct.alter
})

const visible = ref(false);
const loading = ref(false);

const activeKey = ref("0")

const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="$t('ui.label.form.alterDatabase')" @ok="alterDatabase" :width="800"
           :bodyStyle="{height: '610px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.database.altering" @click="alterDatabase">{{ $t('ui.btn.alterDatabase') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item :label="$t('tdengine.cache.model')">
        <a-radio-group v-model:value="formState.cachemodel" button-style="solid">
          <a-radio-button value="none">{{ $t('common.none') }}</a-radio-button>
          <a-radio-button value="last_row">{{ $t('tdengine.cache.lastRow') }}</a-radio-button>
          <a-radio-button value="last_value">{{ $t('tdengine.cache.lastValue') }}</a-radio-button>
          <a-radio-button value="both">{{ $t('tdengine.cache.both') }}</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item :label="$t('tdengine.cache.size')" v-if="formState.cachemodel !== 'none'">
        <a-input-group compact>
          <a-input-number v-model:value="formState.cachesize" :min="1" :max="65536" placeholder="1"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$t('common.keep')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.keep" :min="1" :max="365000" placeholder="3650"/>
          <a-button disabled>{{ $tc('common.days', 2) }}</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$t('common.buffer')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.buffer" :min="3" :max="16384" placeholder="3"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$t('tdengine.wal.level')">
        <a-radio-group v-model:value="formState.walLevel" button-style="solid">
          <a-radio-button value="1">Level 1</a-radio-button>
          <a-radio-button value="2">Level 2</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item :label="$t('tdengine.wal.fsyncPeriod')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.walFsyncPeriod" :min="0" :max="180000" placeholder="3000"/>
          <a-button disabled>ms</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$tc('tdengine.wal.page', 2)">
        <a-input-group compact>
          <a-input-number v-model:value="formState.pages" :min="64" placeholder="256"/>
          <a-button disabled>MB</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$t('common.replica')">
        <a-radio-group v-model:value="formState.replica" button-style="solid">
          <a-radio-button value="1">1</a-radio-button>
          <a-radio-button value="3">3</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item :label="$t('tdengine.sttTrigger')">
        <a-input-number v-model:value="formState.sttTrigger" :max="16" :min="1" placeholder="1"/>
      </a-form-item>

      <a-form-item :label="$t('tdengine.wal.retentionPeriod')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.walRetentionPeriod" :min="0" :max="16384" placeholder="0"/>
          <a-button disabled>s</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="$t('tdengine.wal.retentionSize')">
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
