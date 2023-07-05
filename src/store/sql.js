import {defineStore} from "pinia";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {sqlConfig} from "../config/sql-config.js";

export const useSqlStore = defineStore('sql', () => {
    const state = reactive({
        executing: true
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
        tsOffset: {...sqlConfig.tsOffset}
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
