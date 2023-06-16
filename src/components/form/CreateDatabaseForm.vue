<script setup>
import {computed, reactive, ref, toRaw} from "vue";

const visible = ref(false);
const loading = ref(false);
const formState = reactive({
  name: "",
  ifNotExists: true,
  cacheModel: "none",
  cacheSize: 1,
  precision: "ms",
  keep: 3650,
  buffer: 96,
  comp: "2",

  durationVal: null,
  durationPeriod: "d",
  walLevel: "2",
  walFsyncPeriod: null,
  maxRows: null,
  minRows: null,
  pages: null,
  pageSize: null,
  replica: null,
  retentions: [
    {
      val: null,
      period: "s",
      keep: null
    },
    {
      val: null,
      period: "m",
      keep: null
    },
    {
      val: null,
      period: "m",
      keep: null
    }
  ],

  retentionsLv1: null,
  retentionsLv2: null,
  retentionsLv3: null,
  retentionsLv1Period: "s",
  retentionsLv2Period: "m",
  retentionsLv3Period: "m",
  retentionsLv1Keep: null,
  retentionsLv2Keep: null,
  retentionsLv3Keep: null,
  vGroups: null,
  singleStable: "0",
  sttTrigger: null,
  tablePrefix: null,
  tableSuffix: null,
  tsdbPageSize: null,
  walRetentionPeriod: null,
  walRetentionSize: null,
  walRollPeriod: null,
  walSegmentSize: null,
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
  <a-modal v-model:visible="visible" title="Create Database" @ok="handleOk" :width="800"
           :bodyStyle="{height: '500px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Create Database</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item label="Name">
        <a-row align="middle" :gutter="[20, 0]">
          <a-col :span="12">
            <a-input v-model:value="formState.name" placeholder=""/>
          </a-col>
          <a-col :span="12">
            <a-checkbox v-model:checked="formState.ifNotExists">If not exists</a-checkbox>
          </a-col>
        </a-row>
      </a-form-item>

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

      <a-form-item label="Precision">
        <a-radio-group v-model:value="formState.precision" button-style="solid">
          <a-radio-button value="ms">ms</a-radio-button>
          <a-radio-button value="us">us</a-radio-button>
          <a-radio-button value="ns">ns</a-radio-button>
        </a-radio-group>
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

      <a-form-item label="Comp">
        <a-radio-group v-model:value="formState.comp" button-style="solid">
          <a-radio-button value="0">None</a-radio-button>
          <a-radio-button value="1">Level 1</a-radio-button>
          <a-radio-button value="2">Level 2</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-collapse v-model:activeKey="activeKey" ghost class="no-padding-left">
        <a-collapse-panel key="1" header="Advanced">
          <a-form-item label="Duration">
            <a-input-group compact>
              <a-input-number v-model:value="formState.durationVal" :min="1" :max="365000" placeholder=""/>
              <a-select v-model:value="formState.durationPeriod">
                <a-select-option value="m">Minutes</a-select-option>
                <a-select-option value="h">Hours</a-select-option>
                <a-select-option value="d">Days</a-select-option>
              </a-select>
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

          <a-form-item label="MAXROWS">
            <a-input-number v-model:value="formState.maxRows" :min="1" placeholder="4096"/>
          </a-form-item>

          <a-form-item label="MINROWS">
            <a-input-number v-model:value="formState.minRows" :min="1" placeholder="100"/>
          </a-form-item>

          <a-form-item label="PAGES">
            <a-input-group compact>
              <a-input-number v-model:value="formState.pages" :min="64" placeholder="256"/>
              <a-button disabled>MB</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item label="PAGESIZE">
            <a-input-group compact>
              <a-input-number v-model:value="formState.pageSize" :min="1" :max="16384" placeholder="4"/>
              <a-button disabled>KB</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item label="REPLICA">
            <a-radio-group v-model:value="formState.replica" button-style="solid">
              <a-radio-button value="1">1</a-radio-button>
              <a-radio-button value="3">3</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="RETENTIONS">
            <a-space v-for="retention in formState.retentions">
              <a-input-group compact>
                <a-input-number v-model:value="retention.val" :min="1" placeholder="15"/>
                <a-select v-model:value="retention.period">
                  <a-select-option value="s">Seconds</a-select-option>
                  <a-select-option value="m">Minutes</a-select-option>
                  <a-select-option value="h">Hours</a-select-option>
                </a-select>
              </a-input-group>
              <a-input-group compact>
                <a-input-number v-model:value="retention.keep" :min="1" placeholder="7"/>
                <a-button disabled>Days</a-button>
              </a-input-group>
            </a-space>
          </a-form-item>

          <a-form-item label="vGroups">
            <a-input-number v-model:value="formState.vGroups" placeholder=""/>
          </a-form-item>

          <a-form-item label="Single STable">
            <a-radio-group v-model:value="formState.singleStable" button-style="solid">
              <a-radio-button value="0">0</a-radio-button>
              <a-radio-button value="1">1</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="STT_TRIGGER">
            <a-input-number v-model:value="formState.sttTrigger" :max="16" :min="1" placeholder="1"/>
          </a-form-item>

          <a-form-item label="Table Prefix">
            <a-input v-model:value="formState.tablePrefix" placeholder=""/>
          </a-form-item>

          <a-form-item label="Table Suffix">
            <a-input v-model:value="formState.tableSuffix" placeholder=""/>
          </a-form-item>

          <a-form-item label="TSDB_PAGESIZE">
            <a-input-group compact>
              <a-input-number v-model:value="formState.tsdbPageSize" :max="16384" :min="4" placeholder="4"/>
              <a-button disabled>MB</a-button>
            </a-input-group>
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

          <a-form-item label="WAL_ROLL_PERIOD">
            <a-input-group compact>
              <a-input-number v-model:value="formState.walRollPeriod" :min="0" placeholder="0"/>
              <a-button disabled>s</a-button>
            </a-input-group>
          </a-form-item>

          <a-form-item label="WAL_SEGMENT_SIZE">
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
