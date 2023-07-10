import {defineStore} from "pinia";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {sqlConfig} from "../config/sql-config.js";
import dayjs from "dayjs";

export const useSqlStore = defineStore('sql', () => {
    const mode = ref("normal")
    const state = reactive({
        executing: false
    })
    const pageSizeOptions = reactive({...sqlConfig.pageSizeOptions})
    const pageSizes = computed(() => {
        return viewMode.value === 'chart' ? pageSizeOptions.chart : pageSizeOptions.table
    })
    const viewMode = ref("table")

    const sql = reactive({
        rawSql: null,
        countSql: null,
    })
    const pagination = reactive({...sqlConfig.pagination})
    const orderBy = reactive({...sqlConfig.orderBy})
    const where = reactive({
        mode: "latest",
        tsOffset: {...sqlConfig.tsOffset},
        timeRange: [dayjs().subtract(1, 'day'), dayjs()],
        tag: {
            name: null,
            values: []
        }
    })

    const execResult = reactive({
        elapsedTime: null,
        total: null,
        data: null
    })

    return {
        mode,
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
