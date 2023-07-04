import {useSqlStore} from "../store/sql.js";
import {apis} from "../config/apis.js";
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {useAppStore} from "../store/app.js";
import {useTableStore} from "../store/table.js";
import {useDatabaseStore} from "../store/database.js";
import {useColumnStore} from "../store/column.js";

export default function useSql() {
    const {httpPost} = useHttpClient()
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const sqlStore = useSqlStore()
    const columnStore = useColumnStore()

    const mode = ref("normal")

    const table = computed(() => {
        return tableStore.currentTableName
    })
    const rawSql = computed(() => {
        return sqlStore.sql.rawSql
    })
    const columns = computed(() => {
        return columnStore.columnsClause
    })

    const setRawSql = (sql) => {
        sqlStore.sql.rawSql = sql
    }
    const setCountSql = (sql) => {
        sqlStore.sql.countSql = sql
    }

    const resetSqlState = () => {
        tableStore.currentStable.name = null
        tableStore.currentChildTable.name = null
        tableStore.currentNormalTable.name = null
        columnStore.columns.items = []
        columnStore.columns.selected = []
        sqlStore.sql.rawSql = null
        sqlStore.sql.countSql = null
        sqlStore.where.tsOffset = {n: 5, unit: "m"}
        sqlStore.pagination.limit = 20
        sqlStore.pagination.current = 1
        sqlStore.pagination.offset = 0
    }

    const simplePaginationQuery = () => {
        let tsOffset = ""
        if (sqlStore.where.tsOffset.n > 0) {
            tsOffset = ` WHERE ts > now - ${sqlStore.where.tsOffset.n}${sqlStore.where.tsOffset.unit}`
        }
        let orderBy = ` ORDER BY ${sqlStore.orderBy.field} ${sqlStore.orderBy.direction}`
        let offset = (sqlStore.pagination.current - 1) * sqlStore.pagination.limit
        let countSql = `SELECT COUNT(*) FROM ${databaseStore.currentDatabase.name}.${table.value} ${tsOffset}`
        let rawSql = `SELECT ${columns.value} FROM ${databaseStore.currentDatabase.name}.${table.value} ${tsOffset} ${orderBy} LIMIT ${offset},${sqlStore.pagination.limit}`
        setRawSql(rawSql.replace(/\s\s+/g, " "))
        setCountSql(countSql)
    }

    const execSql = () => {
        sqlStore.state.executing = true
        httpPost(apis.sql.exec, {...sqlStore.sql}).then(res => {
            sqlStore.execResult.data = res.data?.value.data
            sqlStore.execResult.total = res.data?.value.count
            sqlStore.execResult.elapsedTime = res.data?.value.elapsedTime
        }).finally(() => {
            sqlStore.state.executing = false
        })
    }


    const registerListener = () => {
        watch([rawSql, instanceReady, table, columns], () => {
            if (rawSql.value && instanceReady.value && table.value && columns.value) {
                execSql()
            }
        }, {immediate: true})
        watch(table, () => {
            sqlStore.pagination.current = 1
        })
    }

    return {
        setRawSql,
        setCountSql,
        resetSqlState,
        simplePaginationQuery,
        execSql,
        registerListener
    }
}
