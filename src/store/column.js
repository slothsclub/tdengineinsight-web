import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";

export const useColumnStore = defineStore('column', () => {
    const keyword = ref(null)
    const columns = reactive({
        count: 0,
        items: [],
        selected: []
    })

    const filteredColumns = computed(() => {
        if (!keyword.value) return columns.items
        return columns.items.filter(item => {
            return item.colName.indexOf(keyword.value) > -1
        })
    })

    const columnsClause = computed(() => {
        let col = []
        for (let i in columns.selected) {
            col.push(columns.selected[i].title)
        }
        return col.join(",")
    })

    const antTableColumns = computed(() => {
        return columns.selected
    })

    return {
        keyword,
        columns,
        filteredColumns,
        antTableColumns,
        columnsClause
    }
})
