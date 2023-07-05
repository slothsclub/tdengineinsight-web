import {defineStore} from "pinia";
import {computed, onMounted, reactive, ref, watch} from "vue";

export const useSqlStore = defineStore('sql', () => {
    const state = reactive({
        executing: true
    })
    const pageSizeOptions = reactive({
        table: [20, 50, 100, 200],
        chart: [200, 500, 1000, 5000, 10000, 30000]
    })
    const pageSizes = computed(() => {
        return viewMode.value === 'chart' ? pageSizeOptions.chart : pageSizeOptions.table
    })
    const viewMode = ref("table")

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
        tsOffset: {
            n: 5,
            unit: "m"
        }
    })

    const execResult = reactive({
        elapsedTime: null,
        total: null,
        data: null
    })

    return {
        viewMode,
        state,
        sql,
        where,
        pagination,
        orderBy,
        execResult,
        pageSizes,
        pageSizeOptions,
    }
})
