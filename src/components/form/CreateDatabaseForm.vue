<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {useSchemaStore} from "../../store/schema.js";
import useSchema from "../../support/schema.js";

const visible = ref(false);

const activeKey = ref("0")

const {createDatabase} = useSchema()
const schemaStore = useSchemaStore()
const formState = computed(() => {
  return schemaStore.databaseStruct.create
})

const show = () => {
  visible.value = true
};
const hide = () => {
  visible.value = false
}
defineExpose({
  show,
  hide
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="$t('ui.label.form.createDatabase')" @ok="createDatabase" :width="800"
           :bodyStyle="{height: '500px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.database.creating" @click="createDatabase" :disabled="!formState.name">{{ $t('ui.btn.createDatabase') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item :label="$t('tdengine.database.name')">
        <a-row align="middle" :gutter="[20, 0]">
          <a-col :span="12">
            <a-input v-model:value="formState.name" placeholder=""/>
          </a-col>
          <a-col :span="12">
            <a-checkbox v-model:checked="formState.ifNotExists">{{ $t('common.ifNotExists') }}</a-checkbox>
          </a-col>
        </a-row>
      </a-form-item>

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

      <a-form-item :label="$t('common.precision')">
        <a-radio-group v-model:value="formState.precision" button-style="solid">
          <a-radio-button value="ms">{{ $t('common.ms') }}</a-radio-button>
          <a-radio-button value="us">{{ $t('common.us') }}</a-radio-button>
          <a-radio-button value="ns">{{ $t('common.ns') }}</a-radio-button>
        </a-radio-group>
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

      <a-form-item :label="$t('tdengine.database.comp')">
        <a-radio-group v-model:value="formState.comp" button-style="solid">
          <a-radio-button value="0">{{ $t('common.none') }}</a-radio-button>
          <a-radio-button value="1">Level 1</a-radio-button>
          <a-radio-button value="2">Level 2</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-collapse v-model:activeKey="activeKey" ghost class="no-padding-left">
        <a-collapse-panel key="1" :header="$t('common.advanced')">
          <a-form-item label="Duration">
            <a-input-group compact>
              <a-input-number v-model:value="formState.durationVal" :min="1" :max="365000" placeholder=""/>
              <a-select v-model:value="formState.durationPeriod">
                <a-select-option value="m">{{ $tc('common.minutes', 2) }}</a-select-option>
                <a-select-option value="h">{{ $tc('common.hours', 2) }}</a-select-option>
                <a-select-option value="d">{{ $tc('common.days', 2) }}</a-select-option>
              </a-select>
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

          <a-form-item :label="$t('tdengine.database.maxRows')">
            <a-input-number v-model:value="formState.maxRows" :min="1" placeholder="4096"/>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.minRows')">
            <a-input-number v-model:value="formState.minRows" :min="1" placeholder="100"/>
          </a-form-item>

          <a-form-item :label="$tc('tdengine.wal.page', 2)">
            <a-input-group compact>
              <a-input-number v-model:value="formState.pages" :min="64" placeholder="256"/>
              <a-button disabled>MB</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('tdengine.wal.size')">
            <a-input-group compact>
              <a-input-number v-model:value="formState.pageSize" :min="1" :max="16384" placeholder="4"/>
              <a-button disabled>KB</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('common.replica')">
            <a-radio-group v-model:value="formState.replica" button-style="solid">
              <a-radio-button value="1">1</a-radio-button>
              <a-radio-button value="3">3</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item :label="$tc('common.retention', 2)">
            <a-space v-for="retention in formState.retentions">
              <a-input-group compact>
                <a-input-number v-model:value="retention.val" :min="1" placeholder="15"/>
                <a-select v-model:value="retention.period">
                  <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                  <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                  <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
                </a-select>
              </a-input-group>
              <a-input-group compact>
                <a-input-number v-model:value="retention.keep" :min="1" placeholder="7"/>
                <a-button disabled>{{ $tc('common.days', 2) }}</a-button>
              </a-input-group>
            </a-space>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.vGroups')">
            <a-input-number v-model:value="formState.vGroups" placeholder=""/>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.singleStable')">
            <a-radio-group v-model:value="formState.singleStable" button-style="solid">
              <a-radio-button value="0">0</a-radio-button>
              <a-radio-button value="1">1</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item :label="$t('tdengine.sttTrigger')">
            <a-input-number v-model:value="formState.sttTrigger" :max="16" :min="1" placeholder="1"/>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.tablePrefix')">
            <a-input v-model:value="formState.tablePrefix" placeholder=""/>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.tableSuffix')">
            <a-input v-model:value="formState.tableSuffix" placeholder=""/>
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.tsdbPageSize')">
            <a-input-group compact>
              <a-input-number v-model:value="formState.tsdbPageSize" :max="16384" :min="4" placeholder="4"/>
              <a-button disabled>MB</a-button>
            </a-input-group>
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

          <a-form-item :label="$t('tdengine.wal.rollPeriod')">
            <a-input-group compact>
              <a-input-number v-model:value="formState.walRollPeriod" :min="0" placeholder="0"/>
              <a-button disabled>s</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('tdengine.wal.walSegmentSize')">
            <a-input-group compact>
              <a-input-number v-model:value="formState.walSegmentSize" :min="0" placeholder="0"/>
              <a-button disabled>KB</a-button>
            </a-input-group>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>

    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
