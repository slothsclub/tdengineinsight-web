<script setup>
import {reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {PlusOutlined} from "@ant-design/icons-vue"
import DataType from "../DataType.vue";

const visible = ref(false);
const loading = ref(false);
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
const dropColumn = (i) => {
  formState.columns.splice(i, 1)
}
const addTag = () => {
  formState.tags.push({
    name: null,
    type: "NCHAR",
    length: 4
  })
}
const dropTag = (i) => {
  formState.tags.splice(i, 1)
}
const reset = () => {

}
defineExpose({
  show,
  reset
})
</script>

<template>
  <a-modal v-model:visible="visible" title="Alter Stable" @ok="handleOk" :width="900"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Alter Stable</a-button>
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

          <a-form-item label="Comment">
            <a-textarea v-model:value="formState.comment" placeholder="" :rows="6"/>
          </a-form-item>

        </a-tab-pane>
        <a-tab-pane key="columns">
          <template #tab>
            <span>
              <TableOutlined/>
              Columns
            </span>
          </template>

          <a-row v-for="(col, i) in formState.columns" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>Name:</a-button>
                <a-input v-model:value="col.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Type:</a-button>
                <DataType v-model:type="col.type" v-model:length="col.length"></DataType>
              </a-input-group>
            </a-col>
            <a-col :span="2">
              <a-button shape="circle" type="text" danger @click="dropColumn(i)">
                <template #icon>
                  <DeleteOutlined/>
                </template>
              </a-button>
            </a-col>
          </a-row>
          <a-row justify="center" class="mrg-top">
            <a-button shape="circle" @click="addColumn">
              <template #icon>
                <PlusOutlined/>
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

          <a-row v-for="(tag, i) in formState.tags" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>Name:</a-button>
                <a-input v-model:value="tag.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>Type:</a-button>
                <DataType v-model:type="tag.type" v-model:length="tag.length"></DataType>
              </a-input-group>
            </a-col>
            <a-col :span="2">
              <a-button shape="circle" type="text" danger @click="dropTag(i)">
                <template #icon>
                  <DeleteOutlined/>
                </template>
              </a-button>
            </a-col>
          </a-row>
          <a-row justify="center" class="mrg-top">
            <a-button shape="circle" @click="addTag">
              <template #icon>
                <PlusOutlined/>
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
