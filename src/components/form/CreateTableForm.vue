<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {PlusOutlined} from "@ant-design/icons-vue"
import DataType from "../DataType.vue";
import {useSchemaStore} from "../../store/schema.js";
import useSchema from "../../support/schema.js";
import i18n from "../../locale/i18n.js";

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

const schemaStore = useSchemaStore()
const {createStable, createNormalTable} = useSchema()

const loading = ref(false);
const retentionsEnabled = ref(true);

const formState = computed(() => {
  return schemaStore.stableAndNormalStruct.create
})
const activeKey = ref("options")
const title = computed(() => {
  return i18n.global.t("common.create") + " " + i18n.global.t(`common.${mode.value}`)
})
const show = () => {
  visible.value = true
};
const hide = () => {
  visible.value = false
}

const addColumn = () => {
  schemaStore.stableAndNormalStruct.create.columns.push({
    name: null,
    type: "FLOAT",
    length: null,
    _key: Date.now()
  })
}
const removeColumn = (index) => {
  schemaStore.stableAndNormalStruct.create.columns.splice(index, 1)
}
const addTag = () => {
  schemaStore.stableAndNormalStruct.create.tags.push({
    name: null,
    type: "NCHAR",
    length: 4,
    _key: Date.now()
  })
}
const removeTag = (index) => {
  schemaStore.stableAndNormalStruct.create.tags.splice(index, 1)
}

const handleCreateTable = () => {
  if (mode.value === "stable") createStable()
  if (mode.value === "childAndNormalTable") createNormalTable()
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="title" @ok="handleCreateTable" :width="900"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.table.creating" @click="handleCreateTable" :disabled="!formState.name">{{ $t('ui.btn.createStable') }}</a-button>
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

          <a-form-item :label="$t('common.name')">
            <a-row align="middle" :gutter="[20, 0]">
              <a-col :span="12">
                <a-input v-model:value="formState.name" placeholder=""/>
              </a-col>
              <a-col :span="12">
                <a-checkbox v-model:checked="formState.ifNotExists">{{ $t('common.ifNotExists') }}</a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item :label="$t('common.comment')">
            <a-textarea v-model:value="formState.comment" placeholder="" :rows="3" />
          </a-form-item>

          <a-form-item :label="$t('tdengine.database.watermark')" v-if="retentionsEnabled">
            <a-space direction="vertical">
              <a-input-group compact v-for="watermark in formState.watermarks">
                <a-input-number v-model:value="watermark.val" :min="1" placeholder="15"/>
                <a-select v-model:value="watermark.period">
                  <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                  <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                </a-select>
              </a-input-group>
            </a-space>
          </a-form-item>

          <a-form-item :label="$t('common.maxDelay')" v-if="retentionsEnabled">
            <a-input-group compact>
              <a-input-number v-model:value="formState.maxDelay" :min="1" placeholder=""/>
              <a-select v-model:value="formState.maxDelayPeriod">
                <a-select-option value="s">Seconds</a-select-option>
                <a-select-option value="m">Minutes</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('common.rollup')" v-if="retentionsEnabled">
            <a-input-group compact>
              <a-select v-model:value="formState.rollup">
                <a-select-option value="">{{ $t('common.none') }}</a-select-option>
                <a-select-option value="avg">AVG</a-select-option>
                <a-select-option value="sum">SUM</a-select-option>
                <a-select-option value="min">MIN</a-select-option>
                <a-select-option value="max">MAX</a-select-option>
                <a-select-option value="last">LAST</a-select-option>
                <a-select-option value="first">FIRST</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('tdengine.keywords.SMA')" v-if="false">
            <a-input-group compact>
              <a-select v-model:value="formState.sma">
                <a-select-option value="">{{ $t('common.none') }}</a-select-option>
                <a-select-option value="col1">Column 1</a-select-option>
                <a-select-option value="col2">Column 2</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>

          <a-form-item :label="$t('common.ttl')">
            <a-input-group compact>
              <a-input-number v-model:value="formState.ttl" :min="0" :max="365000" placeholder="3650"/>
              <a-button disabled>{{ $tc('common.days', 2) }}</a-button>
            </a-input-group>
          </a-form-item>

        </a-tab-pane>
        <a-tab-pane key="columns">
          <template #tab>
            <span>
              <TableOutlined/>
              {{ $tc('common.column', 2) }}
            </span>
          </template>

          <a-row v-for="(col, index) in formState.columns" :gutter="[20, 0]" class="mrg-btm" :key="col._key">
            <a-col :span="12">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}: </a-button>
                <a-input v-model:value="col.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="12">
              <a-space>
                <a-input-group compact>
                  <a-button disabled>{{ $t('common.type') }}: </a-button>
                  <DataType v-model:type="col.type" v-model:length="col.length"></DataType>
                </a-input-group>
                <a-button @click="removeColumn(index)" type="link" danger>
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-space>
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
        <a-tab-pane key="tags" v-if="mode === 'stable'">
          <template #tab>
            <span>
              <TagsOutlined/>
              {{ $tc('common.tag', 2) }}
            </span>
          </template>

          <a-row v-for="(tag, index) in formState.tags" :gutter="[20, 0]" class="mrg-btm" :key="tag._key">
            <a-col :span="10">
              <a-input-group compact>
                <a-button disabled>{{ $t('common.name') }}: </a-button>
                <a-input v-model:value="tag.name" placeholder=""/>
              </a-input-group>
            </a-col>
            <a-col :span="14">
              <a-space>
                <a-input-group compact>
                  <a-button disabled>{{ $t('common.type') }}: </a-button>
                  <DataType v-model:type="tag.type" v-model:length="tag.length"></DataType>
                </a-input-group>
                <a-button @click="removeTag(index)" type="link" danger>
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-space>
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
