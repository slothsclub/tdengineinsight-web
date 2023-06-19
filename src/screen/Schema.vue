<script setup>
import {LeftOutlined} from "@ant-design/icons-vue"
import Databases from "./schema/Databases.vue";
import Tables from "./schema/Tables.vue";
import {computed, ref} from "vue";
import CreateDatabaseForm from "../components/form/CreateDatabaseForm.vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()

const createDatabaseFormRef = ref()
const selectedDatabase = computed(() => {
  return route.query.db
})
const value = ref("")

const view = computed(() => {
  if (!selectedDatabase.value) {
    return Databases
  }
  return Tables
})

const title = computed(() => {
  if (!selectedDatabase.value) {
    return "Databases"
  }
  return "Tables on " + selectedDatabase.value
})
const onSearch = () => {

}
const gotoDatabaseView = () => {
  router.push({name: "schema"})
}
</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24">
      <a-space align="center">
        <a-button shape="circle" size="small" @click="gotoDatabaseView" v-if="!!selectedDatabase">
          <template #icon>
            <LeftOutlined/>
          </template>
        </a-button>
        <a-typography-title :level="4">{{ title }}</a-typography-title>
      </a-space>
    </a-col>
    <a-col :span="24" class="mrg-top" v-if="!selectedDatabase">
      <a-button type="primary" @click="createDatabaseFormRef.show()">Create database</a-button>
      <CreateDatabaseForm ref="createDatabaseFormRef" />
    </a-col>
    <a-col :span="24" class="mrg-top" v-if="!!selectedDatabase">
      <a-card>
        <a-input-group compact>
          <a-button disabled>Filters</a-button>
          <a-input-search
              v-model:value="value"
              placeholder="Containing the word"
              style="width: 300px"
              @search="onSearch"
          />
        </a-input-group>
      </a-card>
    </a-col>
    <a-col :span="24">
      <component :is="view" v-model:database="selectedDatabase"/>
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
