import useHttpClient from "./http.js";
import useDatabase from "./database.js";
import useTable from "./table.js";
import useColumn from "./column.js";
import useTag from "./tag.js";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useSchemaStore} from "../store/schema.js";
import useSchemaDatabaseBuilder from "./schema-database-builder.js";
import {apis} from "../config/apis.js";
import {sqlConfig} from "../config/sql-config.js";

export default function useSchema() {
    const {httpPost} = useHttpClient()
    const appStore = useAppStore()
    const {instanceReady} = storeToRefs(appStore)
    const schemaStore = useSchemaStore()

    const {queryDatabases} = useDatabase()
    const {queryStables, queryChildTables, queryNormalTables} = useTable()
    const {queryColumns} = useColumn()
    const {queryTags} = useTag()
    const {buildCreateSql, buildDropSql, buildAlterSql} = useSchemaDatabaseBuilder()


    const showCreateDatabaseForm = () => {
        schemaStore.createDatabaseFormRef.show()
    }
    const hideCreateDatabaseForm = () => {
        schemaStore.createDatabaseFormRef.hide()
    }
    const showAlterDatabaseForm = () => {
        schemaStore.alterDatabaseFormRef.show()
    }
    const hideAlterDatabaseForm = () => {
        schemaStore.alterDatabaseFormRef.hide()
    }
    const createDatabase = () => {
        const sql = buildCreateSql(schemaStore.databaseStruct.create)
        schemaStore.state.database.creating = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            queryDatabases()
            hideCreateDatabaseForm()
            resetCreateDatabaseForm()
        }).finally(() => {
            schemaStore.state.database.creating = false
        })
    }
    const dropDatabase = (name) => {
        return httpPost(apis.sql.exec, {rawSql: buildDropSql(name)})
    }

    const setAlterDatabaseState = (db) => {
        const props = {...db}
        const convert = {
            "keep": propKeepFormat,
            "replica": propToString,
            "walLevel": propToString,
        }
        for (let i in convert) {
            props[i] = convert[i](props[i])
        }
        schemaStore.databaseStruct.alter = {...props}
    }
    const alterDatabase = () => {
        const sql = buildAlterSql(schemaStore.databaseStruct.alter)
        schemaStore.state.database.altering = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            queryDatabases()
            hideAlterDatabaseForm()
        }).finally(() => {
            schemaStore.state.database.altering = false
        })
    }
    const propKeepFormat = (v) => {
        const keep = v.split(",")
        const n = keep[0].replace("m", "")
        return n / (60 * 24)
    }
    const propToString = (v) => {
        return String(v)
    }

    const resetSchemaState = () => {
        resetCreateDatabaseForm()
    }
    const resetCreateDatabaseForm = () => {
        schemaStore.databaseStruct.create = {...sqlConfig.schema.database.create}
    }

    const registerListener = () => {
        watch(instanceReady, () => {
            if (!instanceReady.value) return
            queryDatabases()
        }, {immediate: true})
    }

    onMounted(() => {

    })
    onBeforeUnmount(() => {

    })
    return {
        registerListener,
        createDatabase,
        resetSchemaState,
        dropDatabase,
        setAlterDatabaseState,
        alterDatabase,

        showCreateDatabaseForm,
    }
}
