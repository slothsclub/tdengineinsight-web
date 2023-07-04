import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import _ from "lodash"

export const useTableStore = defineStore('table', () => {
    const allTables = reactive({
        stable: [],
        childTables: [],
        normalTables: []
    })
    const loadingState = reactive({
        stable: false,
        childTable: false,
        normalTable: false
    })
    const filter = reactive({
        stableKeyword: null,
        childTableKeyword: null,
        normalTableKeyword: null
    })
    const mode = ref("stable")

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
            case "stable":
                name = currentStable.name
                break;
            case "childTable":
                name = currentChildTable.name
                break;
            case "normalTable":
                name = currentNormalTable.name
                break;
        }
        return name
    })
    const defaultStableName = computed(() => {
        return allTables.stable.length > 0 ? allTables.stable[0].stableName : null
    })
    const defaultChildTableName = computed(() => {
        return allTables.childTables.length > 0 ? allTables.childTables[0].tableName : null
    })
    const defaultNormalTableName = computed(() => {
        return allTables.normalTables.length > 0 ? allTables.normalTables[0].tableName : null
    })

    const stables = computed(() => {
        if (!filter.stableKeyword || mode.value !== "stable") return _.slice(allTables.stable, 0, 100)
        const filtered = _.filter(allTables.stable, n => {
            return n.stableName?.indexOf(filter.stableKeyword) >= 0 || n.tableComment?.indexOf(filter.stableKeyword) >= 0
        })
        return filtered.length > 100 ? filtered.slice(0, 100) : filtered
    })
    const childTables = computed(() => {
        if (!filter.stableKeyword || mode.value !== "childTable") return _.slice(allTables.childTables, 0, 100)
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

    const isTooMuchChildTables = computed(() => {
        return mode.value === 'childTable' && allTables.childTables.length > 100
    })

    const hasTables = computed(() => {
        switch (mode.value) {
            case "stable":
                return allTables.stable.length > 0
            case "childTable":
                return allTables.childTables.length > 0
            case "normalTable":
                return allTables.normalTables.length > 0
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
        isTooMuchChildTables,
        hasTables,
    }
})
