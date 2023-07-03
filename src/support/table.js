import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {computed, onBeforeUnmount, onMounted, watch} from "vue";
import {useDatabaseStore} from "../store/database.js";
import {apis} from "../config/apis.js";
import {useRoute} from "vue-router";
import {useTableStore} from "../store/table.js";

export default function useTable(bindWatcher) {
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const {httpGet} = useHttpClient()
    const route = useRoute()
    const tableStore = useTableStore()

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
        return route.query.mode
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
        if (!currentStable.value || tableStore.mode !== 'childTable') return
        tableStore.loadingState.childTable = true
        httpGet(apis.meta.tables, {
            dbName: currentDatabase.value,
            tableName: currentStable.value,
            tableType: "child"
        }).then(res => {
            tableStore.allTables.childTables = res.data
            setCurrentChildTable(userSelectedChildTable.value || tableStore.defaultChildTableName)
        }).finally(() => {
            tableStore.loadingState.childTable = false
        })
    }
    const queryNormalTables = () => {
        if (!currentDatabase.value) return
        tableStore.loadingState.normalTable = true
        httpGet(apis.meta.tables, {dbName: currentDatabase.value, tableType: "normal"}).then(res => {
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
        if (!currentDatabase.value) return
        queryStables()
        if (userSelectedStable.value) {
            queryChildTables()
        }
        if (userSelectedMode.value === 'normalTable') {
            queryNormalTables()
        }
    }

    bindWatcher && watch([currentInstanceId, currentDatabase], loadTables, {immediate: false})

    bindWatcher && watch(userSelectedStable, () => {
        setCurrentStable(userSelectedStable.value)
    })
    bindWatcher && watch(userSelectedMode, () => {
        if (userSelectedMode.value === 'normalTable') queryNormalTables()
        if (userSelectedMode.value === 'stable') queryStables()
    })

    onMounted(() => {
        if (route.query.mode) tableStore.mode = route.query.mode
        if (route.query.stable) setCurrentStable(route.query.stable)
        if (route.query.childTable) setCurrentChildTable(route.query.childTable)
        if (route.query.normalTable) setCurrentNormalTable(route.query.normalTable)
    })
    onBeforeUnmount(() => {
        tableStore.currentStable.name = null
        tableStore.mode = "stable"
        tableStore.allTables.stable = []
        tableStore.allTables.childTables = []
        tableStore.allTables.normalTables = []
        tableStore.currentChildTable.name = null
        tableStore.currentNormalTable.name = null
    })
    return {
        queryStables,
        queryChildTables,
        queryNormalTables,
        userSelectedStable
    }
}
