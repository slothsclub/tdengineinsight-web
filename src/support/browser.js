import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useDatabase from "./database.js";
import {useDatabaseStore} from "../store/database.js";
import useTable from "./table.js";
import {useTableStore} from "../store/table.js";
import {useColumnStore} from "../store/column.js";
import {useSqlStore} from "../store/sql.js";
import useSql from "./sql.js";
import useColumn from "./column.js";

export default function useBrowser() {
    const router = useRouter()
    const appStore = useAppStore()
    const {currentInstanceId} = storeToRefs(appStore)
    const {registerListener: registerDatabaseListener, resetDatabaseStore} = useDatabase()
    const databaseStore = useDatabaseStore()
    const {resetTableState, registerListener: registerTableListener} = useTable()
    const tableStore = useTableStore()
    const columnStore = useColumnStore()
    const sqlStore = useSqlStore()
    const {
        buildSimplePaginationSql,
        execSql,
        registerListener: registerSqlListener,
        setStateToChartView,
        setStateToTableView,
        resetSqlState
    } = useSql()
    const {registerListener: registerColumnListener, resetColumnState} = useColumn()

    const viewport = ref("browse")
    const table = computed(() => {
        return tableStore.currentTableName
    })
    const db = computed(() => {
        return databaseStore.currentDatabase.name
    })
    const columns = computed(() => {
        return columnStore.columnsClause
    })

    const handleDatabaseChange = () => {
        resetTableState()
        resetColumnState()
        router.push({
            name: "browser",
            query: {
                dbName: databaseStore.currentDatabase.name,
                mode: tableStore.mode,
            }
        })
    }

    const handleViewModeChange = () => {
        if (sqlStore.viewMode === 'table') {
            setStateToTableView()
        }
        if (sqlStore.viewMode === 'chart') {
            setStateToChartView()
        }
    }

    const init = () => {
        registerColumnListener()
        registerDatabaseListener()
        registerTableListener()
        registerSqlListener()
    }

    watch([table, db, columns], () => {
        if (!table.value || !db.value || !columns.value) return
        buildSimplePaginationSql()
    })

    onMounted(() => {

    })

    onUnmounted(() => {
        resetDatabaseStore()
        resetTableState()
        resetColumnState()
        resetSqlState()
    })

    return {
        viewport,
        init,
        handleDatabaseChange,
        handleViewModeChange,

        databaseStore,
        tableStore,
        sqlStore,
        execSql
    }
}
