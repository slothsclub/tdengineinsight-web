import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import _ from "lodash"

export const useColumnStore = defineStore('column', () => {
    const keyword = ref(null)
    const columns = reactive({
        count: 0,
        items: [],
        selected: [] // [{dataIndex: null, title: null}]
    })
    const chartSeries = reactive({
        selected: [],
        columns: []
    })
    const tsColumnName = ref('ts')

    const filteredColumns = computed(() => {
        if (!keyword.value) return columns.items
        return columns.items.filter(item => {
            return item.colName.indexOf(keyword.value) > -1
        })
    })

    const columnsClause = computed(() => {
        let col = []
        for (let i in columns.selected) {
            col.push("`" + columns.selected[i].dataIndex + "`")
        }
        return col.join(",")
    })

    const selectedColumnsCount = computed(() => {
        return columns.selected.length
    })

    const antTableColumns = computed(() => {
        return columns.selected
    })

    const hasTsColumn = computed(() => {
        let col = _.filter(columns.items, {colName: "ts"})
        return col.length > 0
    })

    return {
        keyword,
        columns,
        filteredColumns,
        antTableColumns,
        columnsClause,
        selectedColumnsCount,
        chartSeries,
        tsColumnName,
        hasTsColumn
    }
})
