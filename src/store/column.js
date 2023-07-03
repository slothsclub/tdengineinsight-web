import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useColumnStore = defineStore('column', () => {

    const columns = reactive({
        count: 0,
        items: []
    })
    const antTableColumns = computed(() => {
        let cols = []
        for(let i in columns.items) {
            cols.push({
                title: columns.items[i].colName,
                dataIndex: columns.items[i].colName,
            })
        }
        return cols
    })

    return {
        columns,
        antTableColumns
    }
})
