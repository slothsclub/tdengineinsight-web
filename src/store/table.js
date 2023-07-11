import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import _ from "lodash"
import {typeDefine} from "../config/type.js";

export const useTableStore = defineStore('table', () => {
    const allTables = reactive({
        stable: [],
        childTables: [],
        normalTables: [],
        childAndNormalTables: []
    })
    const loadingState = reactive({
        stable: false,
        childTable: false,
        normalTable: false
    })
    const filter = reactive({
        stableKeyword: null,
        childTableKeyword: null,
        normalTableKeyword: null,
        childAndNormalKeyword: null
    })
    const mode = ref(typeDefine.table.SUPER_TABLE) //One of stable, childTable, normalTable, childAndNormalTable

    const currentStable = reactive({
        name: null
    })
    const currentChildTable = reactive({
        name: null
    })
    const currentNormalTable = reactive({
        name: null
    })

    const currentTableName = computed(() => {
        let name = null
        switch (mode.value) {
            case typeDefine.table.SUPER_TABLE:
                name = currentStable.name
                break;
            case typeDefine.table.CHILD_TABLE:
                name = currentChildTable.name
                break;
            case typeDefine.table.NORMAL_TABLE:
                name = currentNormalTable.name
                break;
        }
        return name
    })
    const defaultStableName = computed(() => {
        return allTables.stable?.length > 0 ? allTables.stable[0].stableName : null
    })
    const defaultChildTableName = computed(() => {
        return allTables.childTables?.length > 0 ? allTables.childTables[0].tableName : null
    })
    const defaultNormalTableName = computed(() => {
        return allTables.normalTables?.length > 0 ? allTables.normalTables[0].tableName : null
    })

    const stables = computed(() => {
        if (!filter.stableKeyword || mode.value !== typeDefine.table.SUPER_TABLE) return _.slice(allTables.stable, 0, 100)
        const filtered = _.filter(allTables.stable, n => {
            return n.stableName?.indexOf(filter.stableKeyword) >= 0 || n.tableComment?.indexOf(filter.stableKeyword) >= 0
        })
        return filtered.length > 100 ? filtered.slice(0, 100) : filtered
    })
    const childTables = computed(() => {
        if (!filter.stableKeyword || mode.value !== typeDefine.table.CHILD_TABLE) return _.slice(allTables.childTables, 0, 100)
        const filtered = _.filter(allTables.childTables, n => {
            return n.tableName?.indexOf(filter.stableKeyword) >= 0 || n.tableComment?.indexOf(filter.stableKeyword) >= 0
        })
        return filtered.length > 100 ? filtered.slice(0, 100) : filtered
    })
    const normalTables = computed(() => {
        if (!filter.normalTableKeyword) return _.slice(allTables.normalTables, 0, 100)
        const filtered = _.filter(allTables.normalTables, n => {
            return n.tableName?.indexOf(filter.normalTableKeyword) >= 0 || n.tableComment?.indexOf(filter.normalTableKeyword) >= 0
        })
        return filtered.length > 100 ? filtered.slice(0, 100) : filtered
    })
    const childAndNormalTables = computed(() => {
        if (!filter.childAndNormalKeyword) return allTables.childAndNormalTables
        return _.filter(allTables.childAndNormalTables, n => {
            if (filter.childAndNormalKeyword.startsWith("stable:")) return n.stableName === filter.childAndNormalKeyword.split(":")[1]
            return n.tableName?.indexOf(filter.childAndNormalKeyword) >= 0 || n.tableComment?.indexOf(filter.childAndNormalKeyword) >= 0
        })
    })

    const isTooMuchChildTables = computed(() => {
        return mode.value === typeDefine.table.CHILD_TABLE && allTables.childTables.length > 100
    })

    const hasTables = computed(() => {
        switch (mode.value) {
            case typeDefine.table.SUPER_TABLE:
                return allTables.stable?.length > 0
            case typeDefine.table.CHILD_TABLE:
                return allTables.childTables?.length > 0
            case typeDefine.table.NORMAL_TABLE:
                return allTables.normalTables?.length > 0
        }
        return false
    })

    return {
        mode,
        loadingState,
        allTables,
        currentStable,
        currentChildTable,
        currentNormalTable,
        defaultStableName,
        defaultChildTableName,
        currentTableName,
        defaultNormalTableName,

        filter,
        stables,
        childTables,
        normalTables,
        childAndNormalTables,
        isTooMuchChildTables,
        hasTables,
    }
})
