<script setup>
import {computed, onMounted, reactive, ref, toRaw} from "vue";
import {TableOutlined} from "@ant-design/icons-vue";

const props = defineProps({
  tags: {
    type: Object,
    default() {
      return []
    }
  }
})
const visible = ref(false)
const loading = ref(false)
const counter = ref(1)
const formState = reactive({
  tables: []
});
const activeKey = ref()

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
const onEdit = (targetKey, action) => {
  if (action === 'add') {
    add();
  } else {
    remove(targetKey);
  }
}
const add = () => {
  let table = {
    id: "tab" + counter.value,
    name: "New subtable " + counter.value,
    ifNotExists: true,
    tags: []
  }
  for (let i in props.tags) {
    table.tags.push({
      name: props.tags[i].name,
      value: null
    })
  }
  formState.tables.push(table)
  counter.value++
}
const remove = (targetKey) => {
  let index = 0
  formState.tables.forEach((tab, i) => {
    if (tab.id === targetKey) {
      index = i
    }
  })
  formState.tables.splice(index, 1)
  let prev = Math.max(0, index - 1)
  activeKey.value = formState.tables[prev].id
}

const onFocus = (evt) => {
  if (evt.target.value.startsWith("New")) {
    evt.target.setSelectionRange(0, evt.target.value.length)
  }
}

onMounted(() => {
  add()
})
defineExpose({
  show
})
</script>

<template>
  <a-modal v-model:visible="visible" :title="$t('ui.label.form.createSubtables')" @ok="handleOk" :width="1000"
           :bodyStyle="{height: '650px', 'overflow-y': 'auto'}">
    <template #footer>
      <a-button key="back" @click="handleCancel">{{ $t('ui.btn.cancel') }}</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{ $t('ui.btn.createSubtables') }}</a-button>
    </template>

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{span: 18}" labelAlign="left">

      <a-tabs v-model:activeKey="activeKey" class="tabs min-h" type="editable-card" @edit="onEdit" tabPosition="left">
        <a-tab-pane :key="table.id" v-for="(table, index) in formState.tables" :closable="formState.tables.length > 1">
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
            <a-input v-model:value="tag.value" placeholder="" class="tag-value"/>
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
</style>
