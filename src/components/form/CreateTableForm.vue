<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined} from "@ant-design/icons-vue";
import {PlusOutlined} from "@ant-design/icons-vue"
import DataType from "../DataType.vue";

const visible = ref(false);
const loading = ref(false);
const retentionsEnabled = ref(true);
const formState = reactive({
  name: "",
  ifNotExists: true,
  comment: "",
  watermarks: [
    {
      val: null,
      period: "s"
    },
    {
      val: null,
      period: "s"
    },
    {
      val: null,
      period: "s"
    }
  ],
  maxDelay: null,
  maxDelayPeriod: "s",
  rollup: "none",
  sma: "none",
  ttl: 0,

  columns: [
    {
      name: null,
      type: "FLOAT",
      length: null
    }
  ],
  tags: [
    {
      name: null,
      type: "NCHAR",
      length: 4
    }
  ]
});
const activeKey = ref("options")

const show = () => {
  visible.value = true
};
const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    visible.value = false;
  }, 2000);

  console.log(JSON.stringify(formState))
};
const handleCancel = () => {
  visible.value = false;
};


const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};

const addColumn = () => {
  formState.columns.push({
    name: null,
    type: "FLOAT",
    length: null
  })
}
const addTag = () => {
  formState.tags.push({
    name: null,
    type: "NCHAR",
    length: 4
  })
}

const reset = () => {

}
defineExpose({
  show,
  reset
})
</script>

<template>
  <a-modal v-model:visible="visible" title="Create Stable" @ok="handleOk" :width="800"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Create Stable</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="options">
          <template #tab>
            <span>
              <SettingOutlined/>
              Table Options
            </span>
          </template>

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

          <a-form-item label="Comment">
            <a-textarea v-model:value="formState.comment" placeholder="" :rows="3" />
          </a-form-item>

          <a-form-item label="Watermark" v-if="retentionsEnabled">
            <a-space direction="vertical">
              <a-input-group compact v-for="watermark in formState.watermarks">
                <a-input-number v-model:value="watermark.val" :min="1" placeholder="15"/>
                <a-select v-model:value="watermark.period">
                  <a-select-option value="s">Seconds</a-select-option>
                  <a-select-option value="m">Minutes</a-select-option>
                </a-select>
              </a-input-group>
            </a-space>
          </a-form-item>

          <a-form-item label="Max Delay" v-if="retentionsEnabled">
            <a-input-group compact>
              <a-input-number v-model:value="formState.maxDelay" :min="1" placeholder=""/>
              <a-select v-model:value="formState.maxDelayPeriod">
                <a-select-option value="s">Seconds</a-select-option>
                <a-select-option value="m">Minutes</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item label="Rollup" v-if="retentionsEnabled">
            <a-input-group compact>
              <a-select v-model:value="formState.rollup">
                <a-select-option value="none">None</a-select-option>
                <a-select-option value="avg">AVG</a-select-option>
                <a-select-option value="sum">SUM</a-select-option>
                <a-select-option value="min">MIN</a-select-option>
                <a-select-option value="max">MAX</a-select-option>
                <a-select-option value="last">LAST</a-select-option>
                <a-select-option value="first">FIRST</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item label="SMA">
            <a-input-group compact>
              <a-select v-model:value="formState.sma">
                <a-select-option value="none">None</a-select-option>
                <a-select-option value="col1">Column 1</a-select-option>
                <a-select-option value="col2">Column 2</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item label="TTL">
            <a-input-group compact>
              <a-input-number v-model:value="formState.ttl" :min="0" :max="365000" placeholder="3650"/>
              <a-button disabled>Days</a-button>
            </a-input-group>
          </a-form-item>

        </a-tab-pane>
        <a-tab-pane key="columns">
          <template #tab>
            <span>
              <TableOutlined/>
              Columns
            </span>
          </template>

          <a-row v-for="col in formState.columns" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Name: </a-button>
                <a-input v-model:value="col.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Type: </a-button>
                <DataType v-model:type="col.type" v-model:length="col.length"></DataType>
              </a-input-group>
            </a-col>
          </a-row>
          <a-row justify="center" class="mrg-top">
            <a-button shape="circle" @click="addColumn">
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </a-row>

        </a-tab-pane>
        <a-tab-pane key="tags">
          <template #tab>
            <span>
              <TagsOutlined/>
              Tags
            </span>
          </template>

          <a-row v-for="tag in formState.tags" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Name: </a-button>
                <a-input v-model:value="tag.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Type: </a-button>
                <DataType v-model:type="tag.type" v-model:length="tag.length"></DataType>
              </a-input-group>
            </a-col>
          </a-row>
          <a-row justify="center" class="mrg-top">
            <a-button shape="circle" @click="addTag">
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </a-row>

        </a-tab-pane>
      </a-tabs>

    </a-form>
  </a-modal>
</template>

<style scoped>
  .ant-input-group-compact {
    display: flex;
  }
</style>
