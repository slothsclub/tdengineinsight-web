<script setup>
import {LeftOutlined} from "@ant-design/icons-vue"
import Databases from "./schema/Databases.vue";
import Tables from "./schema/Tables.vue";
import {computed, ref} from "vue";
import CreateDatabaseForm from "../components/form/CreateDatabaseForm.vue";
import {useRoute, useRouter} from "vue-router";
import i18n from "../locale/i18n.js";
import useSchema from "../support/schema.js";
import {useSchemaStore} from "../store/schema.js";
import {storeToRefs} from "pinia";

const route = useRoute()
const router = useRouter()

const {registerListener, showCreateDatabaseForm, setSearchKeyword} = useSchema()
const schemaStore = useSchemaStore()
const {createDatabaseFormRef, currentDatabase} = storeToRefs(schemaStore)

const value = ref("")

const view = computed(() => {
  if (!currentDatabase.value) {
    return Databases
  }
  return Tables
})

const title = computed(() => {
  if (!currentDatabase.value) {
    return i18n.global.tc('common.database', 2)
  }
  return i18n.global.t('ui.title.tablesWithDatabase', [currentDatabase.value])
})
const onSearch = () => {
  setSearchKeyword(schemaStore.tableSearchKeyword)
}
const onFocus = (evt) => {
  evt.target.setSelectionRange(0, evt.target.value.length)
}
const onChange = () => {
  if (!schemaStore.tableSearchKeyword) {
    setSearchKeyword(null)
  }
}
const gotoDatabaseView = () => {
  router.push({name: "schema"})
}

registerListener()
</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24">
      <a-space align="center">
        <a-button shape="circle" size="small" @click="gotoDatabaseView" v-if="!!currentDatabase">
          <template #icon>
            <LeftOutlined/>
          </template>
        </a-button>
        <a-typography-title :level="4">{{ title }}</a-typography-title>
      </a-space>
    </a-col>
    <a-col :span="24" class="mrg-top" v-if="!currentDatabase">
      <a-button type="primary" @click="showCreateDatabaseForm">{{ $t('ui.btn.createDatabase') }}</a-button>
      <CreateDatabaseForm ref="createDatabaseFormRef" />
    </a-col>
    <a-col :span="24" class="mrg-top" v-if="!!currentDatabase">
      <a-card>
        <a-input-group compact>
          <a-button disabled>{{ $tc('common.filter', 2) }}</a-button>
          <a-input-search
              v-model:value="schemaStore.tableSearchKeyword"
              :placeholder="$t('ui.placeholder.searchTables')"
              style="width: 300px"
              @search="onSearch"
              @focusin="onFocus"
              @change="onChange"
          />
        </a-input-group>
      </a-card>
    </a-col>
    <a-col :span="24">
      <component :is="view" v-model:database="currentDatabase"/>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-page-header {
  padding: 5px 10px;
}
.ant-typography {
  margin-bottom: 0;
}
</style>
