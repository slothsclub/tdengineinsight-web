import {useSqlStore} from "../store/sql.js";
import {apis} from "../config/apis.js";
import {computed, onUnmounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {useAppStore} from "../store/app.js";
import {useTableStore} from "../store/table.js";
import {useDatabaseStore} from "../store/database.js";
import {useColumnStore} from "../store/column.js";
import emitter from "./emitter.js";
import {sqlConfig} from "../config/sql-config.js";
import {typeDefine} from "../config/type.js";

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

    const ready = computed(() => {
        return instanceReady.value && databaseStore.currentDatabase.name && table.value && columns.value && rawSql.value
    })

    const setRawSql = (sql) => {
        sqlStore.sql.rawSql = sql
    }
    const setCountSql = (sql) => {
        sqlStore.sql.countSql = sql
    }

    const resetSqlState = () => {
        sqlStore.sql.rawSql = null
        sqlStore.sql.countSql = null
        sqlStore.pagination = {...sqlConfig.pagination}
        sqlStore.orderBy = {...sqlConfig.orderBy}
        sqlStore.where.tsOffset = {...sqlConfig.tsOffset}
    }
    const cleanSqlResult = () => {
        sqlStore.execResult.data = null
        sqlStore.execResult.total = null
        sqlStore.execResult.elapsedTime = null
    }

    const buildSimplePaginationSql = () => {
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
        if (!ready.value) return
        emitter.emit(typeDefine.events.BEFORE_UPDATE_CHART)
        sqlStore.state.executing = true
        httpPost(apis.sql.exec, {...sqlStore.sql}).then(res => {
            sqlStore.execResult.data = res.data?.value.data
            sqlStore.execResult.total = res.data?.value.count
            sqlStore.execResult.elapsedTime = res.data?.value.elapsedTime

            emitter.emit(typeDefine.events.REFRESH_RAW_DATA_CHART)
        }).finally(() => {
            sqlStore.state.executing = false
        })
    }

    const setStateToTableView = () => {
        sqlStore.pagination.limit = sqlConfig.tableDefaultConfig.pageSize
        sqlStore.execResult.total = 0
        sqlStore.orderBy.direction = sqlConfig.tableDefaultConfig.orderBy.direction
    }
    const setStateToChartView = () => {
        sqlStore.pagination.limit = sqlConfig.chartDefaultConfig.pageSize
        sqlStore.execResult.total = 0
        sqlStore.orderBy.direction = sqlConfig.chartDefaultConfig.orderBy.direction
    }

    const registerListener = () => {
        watch([rawSql, instanceReady], () => {
            if (ready.value) {
                execSql()
            }
        }, {immediate: true})
        watch([table, columns], () => {
            if (!ready.value) return
            sqlStore.pagination.current = 1
            buildSimplePaginationSql()
        })
    }

    onUnmounted(() => {
        cleanSqlResult()
    })

    return {
        setRawSql,
        setCountSql,
        resetSqlState,
        buildSimplePaginationSql,
        execSql,
        registerListener,
        setStateToTableView,
        setStateToChartView
    }
}
