import useSql from "./sql.js";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import useColumn from "./column.js";
import {useAppStore} from "../store/app.js";
import _ from "lodash"
import {useInstanceStore} from "../store/instance.js";

export default function useRawSqlQuery() {
    const appStore = useAppStore()
    const instanceStore = useInstanceStore()
    const sqlStore = useSqlStore()
    const columnStore = useColumnStore()
    const {execSqlManually, resetSqlState} = useSql()
    const {resetColumnState, setColumns} = useColumn()

    const sql = ref()
    const queryCount = ref(0)
    const instance = computed(() => {
        return _.find(instanceStore.instances, {id: appStore.currentInstanceId})
    })

    const handleQuery = () => {
        if (!sql.value) return

        sqlStore.sql.rawSql = sql.value
        execSqlManually(sql.value).then(res => {
            if (res?.value.data && res?.value.data.length > 0) {
                getColumnsFromResult(res.value.data[0])
            }
            queryCount.value += 1
        })
    }

    const getColumnsFromResult = (data) => {
        let columns = []
        let keys = Object.keys(data)
        for (let i in keys) {
            columns.push({
                colName: keys[i],
                checked: true
            })
        }
        columns.sort((col) => {
            return ["ts", "_wstart", "_wend"].includes(col.colName) ? -1 : 1
        })
        setColumns(columns)
    }

    onMounted(() => {
        resetColumnState()
        resetSqlState()
        sqlStore.mode = "advanced"
    })
    onBeforeUnmount(() => {
        resetColumnState()
        resetSqlState()
    })

    return {
        handleQuery,
        instance,
        sql,
        queryCount,
    }
}
