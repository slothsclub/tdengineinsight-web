<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import {SettingOutlined, TableOutlined, TagsOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";

const visible = ref(false);
const loading = ref(false);
const formState = reactive({
  name: "",
  ifNotExists: true,
  comment: "",
  tags: [
    {
      name: "tag1",
      value: "foo"
    },
    {
      name: "tag2"
    },
    {
      name: "tag3"
    }
  ]
});

const title = computed(() => {
  return i18n.global.t("ui.label.form.alterSubtable")
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
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ $t('ui.btn.alterSubtable') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-form-item :label="$t('common.ttl')">
        <a-input-group compact>
          <a-input-number v-model:value="formState.ttl" :min="0" :max="365000" placeholder="3650"/>
          <a-button disabled>{{ $tc('common.days', 2) }}</a-button>
        </a-input-group>
      </a-form-item>
      <a-form-item :label="$t('common.comment')">
        <a-textarea v-model:value="formState.comment" placeholder="" :rows="6"/>
      </a-form-item>

      <a-form-item :label="$tc('common.tag', 2)">
        <a-tag color="#2db7f5" v-for="tag in formState.tags" v-show="tag.value">{{ tag.name }}={{ tag.value }}</a-tag>
      </a-form-item>

      <a-divider/>

      <a-form-item v-for="tag in formState.tags" :label="tag.name">
        <a-input v-model:value="tag.value" placeholder="" class="tag-value" />
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
