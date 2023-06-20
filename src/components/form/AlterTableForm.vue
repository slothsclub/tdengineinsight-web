<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {PlusOutlined} from "@ant-design/icons-vue"
import DataType from "../DataType.vue";
const props = defineProps({
  mode: {
    type: String,
    default() {
      return "stable"
    }
  }
})
const mode = computed(() => props.mode)
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
const title = computed(() => {
  return "Alter " + mode.value
})
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
  <a-modal v-model:visible="visible" :title="title" @ok="handleOk" :width="900"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{  title }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-tabs v-model:activeKey="activeKey" type="card" class="tabs min-h">
        <a-tab-pane key="options">
          <template #tab>
            <span>
              <SettingOutlined/>
              {{ $t('ui.label.tableOption') }}
            </span>
          </template>

          <a-form-item :label="$t('common.ttl')" v-show="mode === 'table'">
            <a-input-group compact>
              <a-input-number v-model:value="formState.ttl" :min="0" :max="365000" placeholder="3650"/>
              <a-button disabled>Days</a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item :label="$t('common.comment')">
            <a-textarea v-model:value="formState.comment" placeholder="" :rows="6"/>
          </a-form-item>

        </a-tab-pane>
        <a-tab-pane key="columns">
          <template #tab>
            <span>
              <TableOutlined/>
              {{ $tc('common.column', 2) }}
            </span>
          </template>

          <a-row v-for="(col, i) in formState.columns" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}:</a-button>
                <a-input v-model:value="col.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.type') }}:</a-button>
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
        <a-tab-pane key="tags" v-if="mode === 'stable'">
          <template #tab>
            <span>
              <TagsOutlined/>
              {{ $tc('common.tag', 2) }}
            </span>
          </template>

          <a-row v-for="(tag, i) in formState.tags" :gutter="[20, 0]" class="mrg-btm">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}:</a-button>
                <a-input v-model:value="tag.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.type') }}:</a-button>
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
