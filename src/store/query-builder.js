import {defineStore} from "pinia";
import {useDatabaseStore} from "./database.js";
import {useTableStore} from "./table.js";
import {computed, reactive, ref} from "vue";
import tdengineFunctions from "../config/tdengine-functions.js";
import {sqlConfig} from "../config/sql-config.js";
import i18n from "../locale/i18n.js";
import {typeDefine} from "../config/type.js";
import dayjs from "dayjs";
import {useTagStore} from "./tag.js";


export const useQueryBuilderStore = defineStore('query-builder', () => {
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const tagStore = useTagStore()

    const sql = ref()
    const queryCount = ref(0)
    const functions = reactive({...tdengineFunctions})
    const columns = reactive({
        items: [
            {...sqlConfig.selectClause}
        ]
    })
    const timestampField = ref("ts")
    const timestamp = ref()
    const defaultTimestampRange = reactive({
        start: dayjs().subtract(1, 'month'),
        end: dayjs()
    })
    const orderBy = reactive({
        column: "_wstart",
        direction: "ASC"
    })
    const limitOptions = ref([100, 500, 1000, 3000, 5000])
    const limit = ref(500)
    const windowClause = reactive({...sqlConfig.windowClause})
    const whereTagClause = reactive({
        tags: [{...sqlConfig.tagClause}]
    })

    const formatFunctionsForSelect = computed(() => {
        let options = []
        options.push({id: "none", name: i18n.global.t('common.none')})
        for (let i in functions) {
            let children = []
            for (let j in functions[i]) {
                children.push({id: functions[i][j], name: functions[i][j]})
            }
            options.push({
                id: i,
                name: i18n.global.t(`tdengine.functions.${i}`),
                children: children
            })
        }
        return options
    })
    const columnsTotal = computed(() => {
        return columns.items.length
    })

    const tagClauseAvailable = computed(() => {
        return tableStore.mode === typeDefine.table.SUPER_TABLE
    })

    const filledValuesVisible = computed(() => {
        return windowClause.fillMode === "value" || windowClause.fillMode === "value_f"
    })

    return {
        sql,
        queryCount,
        columns,
        functions,
        timestampField,
        timestamp,
        defaultTimestampRange,
        orderBy,
        limitOptions,
        limit,
        windowClause,
        whereTagClause,
        formatFunctionsForSelect,
        columnsTotal,
        tagClauseAvailable,
        filledValuesVisible,
    }
})
