import {useTableStore} from "../store/table.js";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {useDatabaseStore} from "../store/database.js";
import {computed, reactive, ref, watch} from "vue";
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

    const columnSelectorVisible = ref(false)

    const queryColumns = () => {
        if (!table.value || !db.value || !instanceReady.value) return
        httpGet(apis.meta.columns, {dbName: db.value, tableName: table.value}, {type: "columns"}).then(res => {
            columnStore.columns.count = res.data.length
            columnStore.columns.items = res.data
            setDefaultSelectedColumns()
            setSelectedColumns()
        })
    }

    const setDefaultSelectedColumns = () => {
        for (let i in columnStore.columns.items) {
            columnStore.columns.items[i].checked = i < 11
        }
    }
    const setSelectedColumns = () => {
        let selected = []
        for (let i in columnStore.columns.items) {
            if (!columnStore.columns.items[i].checked) continue
            selected.push({
                title: columnStore.columns.items[i].colName,
                dataIndex: columnStore.columns.items[i].colName,
            })
        }
        columnStore.columns.selected = selected

        setSelectedChartSeries()
    }

    const setSelectedChartSeries = () => {
        let col = []
        for (let i in columnStore.columns.selected) {
            let n = columnStore.columns.selected[i].dataIndex
            if (n === 'ts') continue
            col.push(n)
        }
        columnStore.chartSeries.columns = col
        columnStore.chartSeries.selected = [col[0]]
    }

    const toggleColumnSelectorVisible = () => {
        columnSelectorVisible.value = !columnSelectorVisible.value
        if (columnSelectorVisible.value) {
            return
        }
        setSelectedColumns()
    }

    const resetColumnState = () => {
        columnStore.columns.items = []
        columnStore.columns.selected = []
        columnStore.chartSeries.columns = []
        columnStore.chartSeries.selected = []
    }

    //todo Looking for a better way to register watchers
    const registerListener = () => {
        watch([db, table, instanceReady], queryColumns, {immediate: false})
    }

    return {
        queryColumns,
        columnSelectorVisible,
        toggleColumnSelectorVisible,
        registerListener,
        resetColumnState,
        setDefaultSelectedColumns,
        setSelectedColumns,
        setSelectedChartSeries
    }
}
