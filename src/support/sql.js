import {useSqlStore} from "../store/sql.js";
import {apis} from "../config/apis.js";
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {useAppStore} from "../store/app.js";
import {useTableStore} from "../store/table.js";
import {useDatabaseStore} from "../store/database.js";

export default function useSql(bindWatcher) {
    const {httpPost} = useHttpClient()
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const sqlStore = useSqlStore()

    const mode = ref("normal")

    const table = computed(() => {
        return tableStore.currentTableName
    })
    const rawSql = computed(() => {
        return sqlStore.sql.rawSql
    })

    const setRawSql = (sql) => {
        sqlStore.sql.rawSql = sql
        console.log(sql)
    }
    const setCountSql = (sql) => {
        sqlStore.sql.countSql = sql
    }

    const simplePaginationQuery = () => {
        let tsOffset = ""
        if (sqlStore.where.tsOffset) {
            tsOffset = ` WHERE ts > now - ${sqlStore.where.tsOffset}`
        }
        let orderBy = ` ORDER BY ${sqlStore.orderBy.field} ${sqlStore.orderBy.direction}`
        let offset = (sqlStore.pagination.current - 1) * sqlStore.pagination.limit
        let countSql = `SELECT COUNT(*) FROM ${databaseStore.currentDatabase.name}.${table.value} ${tsOffset}`
        let rawSql = `SELECT * FROM ${databaseStore.currentDatabase.name}.${table.value} ${tsOffset} ${orderBy} LIMIT ${offset},${sqlStore.pagination.limit}`
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

    bindWatcher && watch([rawSql, instanceReady, table], () => {
        console.log("watch ", rawSql.value, instanceReady.value, table.value)
        if (rawSql.value && instanceReady.value && table.value) {
            execSql()
        }
    }, {immediate: true})

    return {
        setRawSql,
        setCountSql,
        simplePaginationQuery
    }
}
