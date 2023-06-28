<script setup>
import {computed, reactive, ref, toRaw} from "vue";
import i18n from "../../locale/i18n.js";
import {useInstances} from "../../support/instance.js";
import {useInstanceStore} from "../../store/instance.js";

const {instanceForm, setFormState, resetFormState, createInstance, updateInstance} = useInstances()
const instanceStore = useInstanceStore()

const editMode = ref(false)

const add = () => {
  resetFormState()
  instanceForm.visible = true
  editMode.value = false
};
const edit = (instance) => {
  setFormState(instance)
  instanceForm.visible = true
  editMode.value = true
}
const handleCancel = () => {
  instanceForm.visible = false;
};

const title = computed(() => {
  return editMode.value ? i18n.global.t('ui.label.form.editDatabase') : i18n.global.t('ui.label.form.addDatabase')
})

defineExpose({
  add,
  edit
})
</script>

<template>
  <a-modal v-model:visible="instanceForm.visible" :title="title">
    <template #footer>
      <a-button key="back" @click="handleCancel">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="instanceStore.isCreating" @click="createInstance" v-show="!editMode">
        {{ $t('ui.btn.addDatabase') }}
      </a-button>
      <a-button key="submit" type="primary" :loading="instanceStore.isUpdating" @click="updateInstance" v-show="editMode">
        {{ $t('ui.btn.updateDatabase') }}
      </a-button>
    </template>

    <a-form :model="instanceForm.state" :label-col="{ span: 10 }" :wrapper-col="{span: 14}" labelAlign="left">
      <a-form-item :label="$t('common.name')" required :validateStatus="instanceForm.validate.name[0]" :help="instanceForm.validate.name[1]">
        <a-input v-model:value="instanceForm.state.name" placeholder=""/>
      </a-form-item>
      <a-form-item :label="$t('common.host')" required :validateStatus="instanceForm.validate.host[0]" :help="instanceForm.validate.host[1]">
        <a-input v-model:value="instanceForm.state.host" placeholder="localhost"/>
      </a-form-item>
      <a-form-item :label="$t('common.port')" required :validateStatus="instanceForm.validate.port[0]" :help="instanceForm.validate.port[1]">
        <a-input v-model:value="instanceForm.state.port" placeholder="6041"/>
      </a-form-item>

      <a-form-item :label="$t('common.username')" required :validateStatus="instanceForm.validate.username[0]" :help="instanceForm.validate.username[1]">
        <a-input v-model:value="instanceForm.state.username" placeholder="root"/>
      </a-form-item>
      <a-form-item :label="$t('common.password')" required :validateStatus="instanceForm.validate.password[0]" :help="instanceForm.validate.password[1]">
        <a-input v-model:value="instanceForm.state.password" placeholder="taosdata"/>
      </a-form-item>

      <a-form-item :label="$t('common.batchFetch')">
        <a-switch v-model:checked="instanceForm.state.batchfetch"/>
      </a-form-item>
      <a-form-item :label="$t('common.ignoreBatchError')">
        <a-switch v-model:checked="instanceForm.state.batchErrorIgnore"/>
      </a-form-item>

      <a-form-item :label="$t('common.httpConnectTimeout')">
        <a-input v-model:value="instanceForm.state.httpConnectTimeout"/>
      </a-form-item>
      <a-form-item :label="$t('common.httpSocketTimeout')" v-if="!instanceForm.state.batchfetch">
        <a-input v-model:value="instanceForm.state.httpSocketTimeout"/>
      </a-form-item>
      <a-form-item :label="$t('common.messageWaitTimeout')" v-if="instanceForm.state.batchfetch">
        <a-input v-model:value="instanceForm.state.messageWaitTimeout"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
