<script setup>
import {computed, onMounted, reactive, ref, toRaw} from "vue";
import {TableOutlined} from "@ant-design/icons-vue";
import useSchema from "../../support/schema.js";
import {useSchemaStore} from "../../store/schema.js";
import {storeToRefs} from "pinia";

const schemaStore = useSchemaStore()
const {selectedChildTable} = storeToRefs(schemaStore)
const {createChildTable, addChildTable, removeChildTable, resetCreateChildTableForm} = useSchema()
const visible = ref(false)

const formState = computed(() => {
  return schemaStore.childTableStruct.create
})

const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}

const onEdit = (targetKey, action) => {
  if (action === 'add') {
    addChildTable();
  } else {
    removeChildTable(targetKey);
  }
}

const onFocus = (evt) => {
  if (evt.target.value.startsWith("New")) {
    evt.target.setSelectionRange(0, evt.target.value.length)
  }
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="$t('ui.label.form.createChildTables')" @ok="createChildTable" :width="1000" @cancel="resetCreateChildTableForm"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.table.creating" @click="createChildTable">{{ $t('ui.btn.createChildTables') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-tabs v-model:activeKey="selectedChildTable" class="tabs min-h" type="editable-card" @edit="onEdit" tabPosition="left" :tab-bar-style="{'min-width': '200px'}">
        <a-tab-pane :key="table.id" v-for="(table, index) in formState?.tables" :closable="formState.tables.length > 1">
          <template #tab>
            <span>
              <TableOutlined/>
              {{ table.name }}
            </span>
          </template>

          <a-form-item :label="$t('common.name')">
            <a-row align="middle" :gutter="[20, 0]">
              <a-col :span="12">
                <a-input v-model:value="table.name" placeholder="" @focusin="onFocus"/>
              </a-col>
              <a-col :span="12">
                <a-checkbox v-model:checked="table.ifNotExists">{{ $t('common.ifNotExists') }}</a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item :label="$tc('common.tag', 2)">
            <a-tag color="#2db7f5" v-for="tag in table.tags" v-show="tag.value">{{ tag.name }}={{ tag.value }}</a-tag>
          </a-form-item>
          <a-divider/>
          <a-form-item v-for="tag in table.tags" :label="tag.name">
            <a-input-group compact>
              <a-button disabled>{{tag.type}}</a-button>
              <a-input v-model:value="tag.value" placeholder="" class="tag-value"/>
            </a-input-group>
          </a-form-item>

        </a-tab-pane>

      </a-tabs>

    </a-form>
  </a-modal>
</template>

<style scoped>
.ant-input-group-compact {
  display: flex;
}
.ant-form-horizontal {
  height: 100%;
}
.tag-value {
  width: 200px;
}
.ant-tabs-tab-btn {
  width: 260px !important;
}
</style>
