<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined, UndoOutlined} from "@ant-design/icons-vue";
import {PlusOutlined} from "@ant-design/icons-vue"
import DataType from "../DataType.vue";
import {useSchemaStore} from "../../store/schema.js";
import useSchema from "../../support/schema.js";
const props = defineProps({
  mode: {
    type: String,
    default() {
      return "stable"
    }
  }
})
const mode = computed(() => props.mode)
const schemaStore = useSchemaStore()
const {alterStable} = useSchema()

const visible = ref(false)
const formState = computed(() => {
  return schemaStore.stableStruct.alter
})

const activeKey = ref("options")
const title = computed(() => {
  return "Alter " + mode.value
})
const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}

const addColumn = () => {
  schemaStore.stableStruct.alter.columns.push({
    name: null,
    type: "FLOAT",
    length: null,
    minLength: null,
    state: "ADD",
    lengthChangeable: true,
    origin: {
      name: null,
      type: null,
      length: null
    }
  })
}
const dropColumn = (col, i) => {
  if(col.state === "KEEP") col.state = "DROP"
  if(col.state === "ADD") schemaStore.stableStruct.alter.columns.splice(i, 1)
}
const restoreColumn = (col, i) => {
  col.state = "KEEP"
}
const addTag = () => {
  schemaStore.stableStruct.alter.tags.push({
    name: null,
    type: "NCHAR",
    length: 4,
    minLength: null,
    state: "ADD",
    lengthChangeable: true,
    origin: {
      name: null,
      type: null,
      length: null
    }
  })
}
const dropTag = (tag, i) => {
  if(tag.state === "KEEP") tag.state = "DROP"
  if(tag.state === "ADD") schemaStore.stableStruct.alter.tags.splice(i, 1)
}
const restoreTag = (tag, i) => {
  tag.state = "KEEP"
}

const dropVisible = (mix) => {
  return ["KEEP", "ADD"].includes(mix.state)
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="title" @ok="alterStable" :width="900"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.table.altering" @click="alterStable">{{  title }}</a-button>
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

          <a-row v-for="(col, i) in formState.columns" :gutter="[20, 0]" class="mrg-btm alter-table-column" :class="{'dropped': col.state === 'DROP'}">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}:</a-button>
                <a-input v-model:value="col.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.type') }}:</a-button>
                <a-button disabled v-show="['KEEP', 'DROP'].includes(col.state)">{{ col.type }}</a-button>
                <DataType v-model:type="col.type" v-model:length="col.length" v-show="col.state==='ADD'"></DataType>
              </a-input-group>
            </a-col>
            <a-col :span="2">
              <a-button shape="circle" type="text" danger @click="dropColumn(col, i)" v-show="dropVisible(col)" class="drop">
                <template #icon>
                  <DeleteOutlined/>
                </template>
              </a-button>
              <a-button shape="circle" type="text" @click="restoreColumn(col, i)" v-show="col.state === 'DROP'" class="restore">
                <template #icon>
                  <UndoOutlined/>
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

          <a-row v-for="(tag, i) in formState.tags" :gutter="[20, 0]" class="mrg-btm alter-table-tag" :class="{'dropped': tag.state === 'DROP'}">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}:</a-button>
                <a-input v-model:value="tag.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.type') }}:</a-button>
                <DataType v-model:type="tag.type" v-model:length="tag.length" v-show="tag.state==='ADD'"></DataType>
                <a-button disabled v-show="tag.state!=='ADD'">{{ tag.type }}</a-button>
                <a-input-number v-show="tag.lengthChangeable && tag.state!=='ADD'" v-model:value="tag.length" :min="tag.minLength"></a-input-number>
              </a-input-group>
            </a-col>
            <a-col :span="2">
              <a-button shape="circle" type="text" danger @click="dropTag(tag, i)" v-show="dropVisible(tag)" class="drop">
                <template #icon>
                  <DeleteOutlined/>
                </template>
              </a-button>
              <a-button shape="circle" type="text" @click="restoreTag(tag, i)" v-show="tag.state === 'DROP'" class="restore">
                <template #icon>
                  <UndoOutlined/>
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
