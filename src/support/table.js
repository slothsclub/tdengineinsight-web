import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useDatabaseStore} from "../store/database.js";
import {apis} from "../config/apis.js";
import {useRoute, useRouter} from "vue-router";
import {useTableStore} from "../store/table.js";
import {typeDefine} from "../config/type.js";
import useSql from "./sql.js";
import useColumn from "./column.js";

export default function useTable() {
    const router = useRouter()
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const {httpGet} = useHttpClient()
    const route = useRoute()
    const tableStore = useTableStore()
    const activeTab = ref(route.query.activeTab || typeDefine.table.SUPER_TABLE)
    const {resetSqlState} = useSql()
    const {resetColumnState} = useColumn()

    const databaseStore = useDatabaseStore()
    const currentDatabase = computed(() => {
        return databaseStore.currentDatabase.name
    })
    const currentStable = computed(() => {
        return tableStore.currentStable.name
    })

    const userSelectedStable = computed(() => {
        return route.query.stable
    })
    const userSelectedChildTable = computed(() => {
        return route.query.childTable
    })
    const userSelectedNormalTable = computed(() => {
        return route.query.normalTable
    })
    const userSelectedMode = computed(() => {
        return route.query.mode || typeDefine.table.SUPER_TABLE
    })

    const queryStables = () => {
        if (!currentDatabase.value) return
        tableStore.loadingState.stable = true
        httpGet(apis.meta.stables, {dbName: currentDatabase.value}).then(res => {
            tableStore.allTables.stable = res.data
            setCurrentStable(userSelectedStable.value || tableStore.defaultStableName)
        }).finally(() => {
            tableStore.loadingState.stable = false
        })
    }

    const queryChildTables = () => {
        if (!currentStable.value || tableStore.mode !== typeDefine.table.CHILD_TABLE || !instanceReady.value) return
        tableStore.loadingState.childTable = true
        httpGet(apis.meta.tables, {
            dbName: currentDatabase.value,
            tableName: currentStable.value,
            tableType: tableStore.mode
        }).then(res => {
            tableStore.allTables.childTables = res.data
            setCurrentChildTable(userSelectedChildTable.value || tableStore.defaultChildTableName)
        }).finally(() => {
            tableStore.loadingState.childTable = false
        })
    }
    const queryNormalTables = () => {
        if (!currentDatabase.value || !instanceReady.value) return
        tableStore.loadingState.normalTable = true
        httpGet(apis.meta.tables, {dbName: currentDatabase.value, tableType: tableStore.mode}).then(res => {
            tableStore.allTables.normalTables = res.data
            setCurrentNormalTable(userSelectedNormalTable.value || tableStore.defaultNormalTableName)
        }).finally(() => {
            tableStore.loadingState.normalTable = false
        })
    }

    const setCurrentStable = (name) => {
        tableStore.currentStable.name = name
    }
    const setCurrentChildTable = (name) => {
        tableStore.currentChildTable.name = name
    }
    const setCurrentNormalTable = (name) => {
        tableStore.currentNormalTable.name = name
    }

    const loadTables = () => {
        resetTableState()
        if (!currentDatabase.value) return
        if (userSelectedMode.value === typeDefine.table.SUPER_TABLE || userSelectedMode.value === typeDefine.table.CHILD_TABLE) {
            queryStables()
        }
        if (userSelectedStable.value) {
            queryChildTables()
        }
        if (userSelectedMode.value === typeDefine.table.NORMAL_TABLE) {
            queryNormalTables()
        }
    }

    const resetTableState = () => {
        //tableStore.mode = typeDefine.table.SUPER_TABLE
        tableStore.currentStable.name = null
        tableStore.currentChildTable.name = null
        tableStore.currentNormalTable.name = null
        tableStore.allTables.stable = []
        tableStore.allTables.childTables = []
        tableStore.allTables.normalTables = []
        tableStore.filter.stableKeyword = null
        tableStore.filter.childTableKeyword = null
        tableStore.filter.normalTableKeyword = null
    }

    const switchToChildTablesView = (stable) => {
        tableStore.mode = typeDefine.table.CHILD_TABLE
        tableStore.currentStable.name = stable.stableName
        queryChildTables()
        redirect()
    }
    const handleStableSelect = (stable) => {
        tableStore.currentStable.name = stable.stableName
        redirect()
    }
    const handleChildTableSelect = (childTable) => {
        tableStore.currentChildTable.name = childTable.tableName
        redirect()
    }
    const handleNormalTableSelect = (normalTable) => {
        tableStore.currentNormalTable.name = normalTable.tableName
        tableStore.mode = typeDefine.table.NORMAL_TABLE
        redirect()
    }
    const handleTabsChange = (k) => {
        resetTableState()
        resetSqlState()
        resetColumnState()
        tableStore.mode = k
        redirect()
    }
    const backToStable = () => {
        tableStore.mode = typeDefine.table.SUPER_TABLE
        tableStore.currentChildTable.name = null
        redirect()
    }
    const redirect = () => {
        router.push({
            name: "browser",
            query: {
                dbName: databaseStore.currentDatabase.name,
                stable: tableStore.currentStable.name,
                childTable: tableStore.currentChildTable.name,
                normalTable: tableStore.currentNormalTable.name,
                mode: tableStore.mode,
                activeTab: activeTab.value
            }
        })
    }

    const registerListener = () => {
        watch([currentInstanceId, currentDatabase], loadTables, {immediate: false})

        watch(userSelectedStable, () => {
            setCurrentStable(userSelectedStable.value)
        })
        watch(userSelectedMode, () => {
            tableStore.mode = userSelectedMode.value
            if (userSelectedMode.value === typeDefine.table.NORMAL_TABLE) queryNormalTables()
            if (userSelectedMode.value === typeDefine.table.SUPER_TABLE) queryStables()
        })
        watch(currentStable, () => {
            queryChildTables()
        })
    }

    const calcTableContainerHeight = () => {
        nextTick(() => {
            const h = document.getElementsByClassName("sider")[0].clientHeight
            const dom = document.getElementsByClassName("table-list")
            Array.prototype.forEach.call(dom, function(el) {
                el.style.maxHeight = (h - el.getBoundingClientRect().top - 60) + 'px'
            })
        })
    }

    onMounted(() => {
        if (route.query.mode) tableStore.mode = route.query.mode
        if (route.query.stable) setCurrentStable(route.query.stable)
        if (route.query.childTable) setCurrentChildTable(route.query.childTable)
        if (route.query.normalTable) setCurrentNormalTable(route.query.normalTable)

        calcTableContainerHeight()
    })
    onBeforeUnmount(() => {
        resetTableState()
    })
    return {
        queryStables,
        queryChildTables,
        queryNormalTables,
        userSelectedStable,
        resetTableState,
        registerListener,

        activeTab,
        switchToChildTablesView,
        handleStableSelect,
        handleChildTableSelect,
        handleNormalTableSelect,
        handleTabsChange,
        backToStable,
    }
}
