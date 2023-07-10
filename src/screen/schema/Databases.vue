<script setup>
import DatabaseExtraInfo from "./DatabaseExtraInfo.vue";
import AlterDatabaseForm from "../../components/form/AlterDatabaseForm.vue";
import {createVNode, ref} from "vue";
import {useRouter} from "vue-router";
import {EditOutlined, InfoOutlined, DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";
import {useDatabaseStore} from "../../store/database.js";
import {Modal} from "ant-design-vue";
import useSchema from "../../support/schema.js";
import useDatabase from "../../support/database.js";
import {storeToRefs} from "pinia";
import {useSchemaStore} from "../../store/schema.js";

const emit = defineEmits(['update:database'])
const dbExtraInfoRef = ref()
const router = useRouter()

const {queryDatabases} = useDatabase()
const databaseStore = useDatabaseStore()
const {dropDatabase, setAlterDatabaseState} = useSchema()
const schemaStore = useSchemaStore()
const {alterDatabaseFormRef} = storeToRefs(schemaStore)
const selectedDatabase = ref()

const columns = [{
  title: i18n.global.t('tdengine.database.name'),
  dataIndex: 'name'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'createTime'
}, {
  title: i18n.global.t('tdengine.database.NTables'),
  dataIndex: 'ntables'
}, {
  title: i18n.global.t('tdengine.database.vGroups'),
  dataIndex: 'vgroups'
}, {
  title: i18n.global.t('common.replica'),
  dataIndex: 'replica'
}, {
  title: i18n.global.t('common.strict'),
  dataIndex: 'strict'
}, {
  title: i18n.global.t('common.duration'),
  dataIndex: 'duration'
}, {
  title: i18n.global.t('common.keep'),
  dataIndex: 'keep'
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status'
}, {
  title: i18n.global.t('common.precision'),
  dataIndex: 'precision'
},{
  title: i18n.global.t('common.cacheModel'),
  dataIndex: 'cachemodel'
}, {
  title: i18n.global.t('common.action'),
  key: 'action',
}
]

const handleSelectDatabase = (name) => {
  router.push({name: "schema", query: {db: name}})
}
const handleShowDatabaseMoreInfo = (database) => {
  selectedDatabase.value = database
  dbExtraInfoRef.value.show()
}
const handleAlterDatabase = (db) => {
  setAlterDatabaseState(db)
  alterDatabaseFormRef.value.show()
}
const handleDropDatabase = (db) => {
  Modal.confirm({
    title: i18n.global.t("ui.label.deleteDatabase"),
    icon: createVNode(ExclamationCircleOutlined),
    content: i18n.global.t("ui.tips.deleteDatabase", [db.name]),
    onOk() {
      return new Promise((resolve, reject) => {
        dropDatabase(db.name).then(() => {
          queryDatabases()
          resolve()
        }, () => {
          reject()
        }).finally(() => {

        })
      })
    },
    onCancel() {
    },
    centered: true,
    maskClosable: true,
    width: 800,
    cancelText: i18n.global.t("common.no"),
    okText: i18n.global.t("common.yes"),
    okType: "primary",
    okButtonProps: {danger: "danger"}
  });
}
</script>

<template>
  <div>
    <a-table class="client-list" :columns="columns" :data-source="databaseStore.databases.userDefined" bordered :pagination="false" size="small">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="handleSelectDatabase(text)">{{ text }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button size="small" @click="handleShowDatabaseMoreInfo(record)">
              <template #icon>
                <InfoOutlined />
              </template>
            </a-button>
            <a-button size="small" @click="handleAlterDatabase(record)">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button size="small" @click="handleDropDatabase(record)">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <DatabaseExtraInfo ref="dbExtraInfoRef" :database="selectedDatabase"/>
    <AlterDatabaseForm ref="alterDatabaseFormRef"></AlterDatabaseForm>
  </div>
</template>

<style scoped>

</style>
