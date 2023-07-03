import {useTableStore} from "../store/table.js";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {useDatabaseStore} from "../store/database.js";
import {computed, reactive, watch} from "vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {useColumnStore} from "../store/column.js";

export default function useColumn() {
    const {httpGet} = useHttpClient()
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const columnStore = useColumnStore()

    const table = computed(() => {
        return tableStore.currentTableName
    })
    const db = computed(() => {
        return databaseStore.currentDatabase.name
    })

    const queryColumns = () => {
        if(!table.value || !db.value || !instanceReady.value) return
        httpGet(apis.meta.columns, {dbName: db.value, tableName: table.value}, {type: "columns"}).then(res => {
            columnStore.columns.count = res.data.length
            columnStore.columns.items = res.data
        })
    }

    watch([db, table, instanceReady], queryColumns, {immediate: false})

    return {
        queryColumns,
    }
}
