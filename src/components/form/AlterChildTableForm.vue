<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";
import {useSchemaStore} from "../../store/schema.js";
import useSchema from "../../support/schema.js";

const {alterChildTable} = useSchema()
const schemaStore = useSchemaStore()

const visible = ref(false)
const formState = computed(() => {
  return schemaStore.childTableStruct.alter
})

const title = computed(() => {
  return i18n.global.t("ui.label.form.alterChildTable")
})
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
  <a-modal v-model:visible="visible" :title="title" @ok="alterChildTable" :width="900"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="hide">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="schemaStore.state.table.altering" @click="alterChildTable">{{ $t('ui.btn.alterChildTable') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-form-item :label="$t('common.ttl')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.table.ttl" :min="0" :max="365000" placeholder="3650"/>
          <a-button disabled>{{ $tc('common.days', 2) }}</a-button>
        </a-input-group>
      </a-form-item>
      <a-form-item :label="$t('common.comment')">
        <a-textarea v-model:value="formState.table.tableComment" placeholder="" :rows="6"/>
      </a-form-item>

      <a-form-item :label="$tc('common.tag', 2)">
        <a-tag color="#2db7f5" v-for="tag in formState.tags" v-show="tag.value">{{ tag.name }}={{ tag.value }}</a-tag>
      </a-form-item>

      <a-divider/>

      <a-form-item v-for="tag in formState.tags" :label="tag.name">
        <a-input-group compact>
          <a-button disabled>{{ tag.type }}</a-button>
          <a-input v-model:value="tag.value" placeholder="" class="tag-value" />
        </a-input-group>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<style scoped>
.ant-input-group-compact {
  display: flex;
}
.tag-value {
  width: 200px;
}
</style>
