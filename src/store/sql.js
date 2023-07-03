import {defineStore} from "pinia";
import {onMounted, reactive, ref, watch} from "vue";

export const useSqlStore = defineStore('sql', () => {
    const state = reactive({
        executing: true
    })
    const pageSizeOptions = reactive([
        20, 50, 100, 200, 500
    ])

    const sql = reactive({
        rawSql: null,
        countSql: null,
    })
    const pagination = reactive({
        offset: 0,
        limit: 20,
        current: 1
    })
    const orderBy = reactive({
        field: "ts",
        direction: "DESC"
    })
    const where = reactive({
        tsOffset: "5m"
    })

    const execResult = reactive({
        elapsedTime: null,
        total: null,
        data: null
    })

    return {
        state,
        sql,
        where,
        pagination,
        orderBy,
        execResult,
        pageSizeOptions,
    }
})
