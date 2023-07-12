import {computed, onMounted, watch} from "vue";
import {useTableStore} from "../store/table.js";
import {useDatabaseStore} from "../store/database.js";
import {useQueryBuilderStore} from "../store/query-builder.js";
import useSql from "./sql.js";
import {useColumnStore} from "../store/column.js";
import useColumn from "./column.js";
import {sqlConfig} from "../config/sql-config.js";
import _ from "lodash"
import {useTagStore} from "../store/tag.js";
import {useAppStore} from "../store/app.js";
import useTag from "./tag.js";
import {storeToRefs} from "pinia";

export default function useQueryBuilder() {
    const appStore = useAppStore()
    const {instanceReady} = storeToRefs(appStore)
    const queryBuilderStore = useQueryBuilderStore()
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const columnStore = useColumnStore()
    const {execSqlManually, setAdvancedMode, setRawSql, execSql, setCountSql} = useSql()
    const {setSelectedChartSeries} = useColumn()
    const {queryTags, queryTagValues} = useTag()
    const tagStore = useTagStore()

    const database = computed(() => {
        return databaseStore.currentDatabase.name
    })
    const table = computed(() => {
        return tableStore.currentTableName
    })
    const windowClauseMode = computed(() => {
        return queryBuilderStore.windowClause.type
    })
    const selectColumns = computed(() => {
        return queryBuilderStore.columns.items
    })
    const fillMode = computed(() => {
        return queryBuilderStore.windowClause.fillMode
    })
    const tags = computed(() => {
        return tagStore.allTags.items
    })

    const addColumn = () => {
        let col = {...sqlConfig.selectClause}
        col.func = sqlConfig.selectClauseDefaultFunction
        col.alias = null
        col.name = null
        col._key = Date.now()
        queryBuilderStore.columns.items.push(col)
    }
    const removeColumn = (index) => {
        queryBuilderStore.columns.items.splice(index, 1)
    }

    const addTagClause = () => {
        queryBuilderStore.whereTagClause.tags.push({...sqlConfig.tagClause})
    }
    const removeTagClause = (index) => {
        queryBuilderStore.whereTagClause.tags.splice(index, 1)
    }

    const handleFunctionChanged = () => {

    }

    const buildSelectColumnsClause = () => {
        const columns = replaceTsColumnToPseudoColumns()
        let select = []
        for (let i in columns) {
            let col = columns[i]
            if (!col.name || col.disabled) continue
            if (col.func === "none" || col.func === null) {
                select.push(col.name)
            } else {
                select.push(col.alias ? `${col.func}(\`${col.name}\`) AS \`${col.alias}\`` : `${col.func}(\`${col.name}\`) AS \`${col.name}\``)
            }
        }
        return select.join(",")
    }
    const buildWhereTimeRangeClause = () => {
        let start = queryBuilderStore.timestamp ? queryBuilderStore.timestamp[0] : queryBuilderStore.defaultTimestampRange.start
        let end = queryBuilderStore.timestamp ? queryBuilderStore.timestamp[1] : queryBuilderStore.defaultTimestampRange.end

        return `\`${queryBuilderStore.timestampField}\` BETWEEN '${start.format("YYYY-MM-DD HH:mm:ss")}' AND '${end.format("YYYY-MM-DD HH:mm:ss")}'`
    }
    const buildWhereTagClause = () => {
        let t = []
        for (let i in queryBuilderStore.whereTagClause.tags) {
            let tag = queryBuilderStore.whereTagClause.tags[i]
            if (!tag.name || !tag.value) continue

            switch (tag.operator) {
                case "=":
                    t.push(`\`${tag.name}\`='${tag.value}'`)
                    break;
                case "like":
                    t.push(`\`${tag.name}\` LIKE '${tag.value}%'`)
                    break;
            }
        }
        return t.length > 0 ? t.join(" AND ") : null
    }
    const buildWhereClause = () => {
        const where = []
        where.push(buildWhereTimeRangeClause())

        const _tag = buildWhereTagClause()
        _tag && where.push(buildWhereTagClause())

        return where.join(" AND ")
    }

    const buildOrderClause = () => {
        return queryBuilderStore.orderBy.column === "none" ? "" : `ORDER BY \`${queryBuilderStore.orderBy.column}\` ${queryBuilderStore.orderBy.direction}`
    }
    const buildLimitClause = () => {
        return `LIMIT ${queryBuilderStore.limit}`
    }
    const buildWindowClause = () => {
        switch (queryBuilderStore.windowClause.type) {
            case "interval":
                return buildIntervalWindowClause()
            case "state":
                return buildStateWindowClause()
            case "session":
                return buildSessionWindowClause()
            default:
                return ""
        }
    }
    const buildIntervalWindowClause = () => {
        switch (queryBuilderStore.windowClause.intervalMode) {
            case "fill":
                let mode = queryBuilderStore.windowClause.fillMode.toUpperCase()
                let fill = `FILL(${mode})`
                if (mode === "VALUE" || mode === "VALUE_F") {
                    fill = `FILL(${mode}, ${buildFilledValues()})`
                }
                return `INTERVAL(${queryBuilderStore.windowClause.interval}${queryBuilderStore.windowClause.intervalUnit}) ${fill}`
            case "sliding":
                return `INTERVAL(${queryBuilderStore.windowClause.interval}${queryBuilderStore.windowClause.intervalUnit}) SLIDING(${queryBuilderStore.windowClause.slidingVal}${queryBuilderStore.windowClause.slidingValUnit})`
            default:
                return ""
        }
    }
    const buildFilledValues = () => {
        let n = []
        for (let i in queryBuilderStore.windowClause.filledValueColumn) {
            let col = queryBuilderStore.windowClause.filledValueColumn[i]
            n.push(col.fillValue || 0)
        }
        return n.join(",")
    }

    const buildStateWindowClause = () => {
        if (!queryBuilderStore.windowClause.stateColumn) return ""
        return `STATE_WINDOW(${queryBuilderStore.windowClause.stateColumn})`
    }
    const buildSessionWindowClause = () => {
        if (!queryBuilderStore.windowClause.sessionTime) return ""
        return `SESSION(ts, ${queryBuilderStore.windowClause.sessionTime}${queryBuilderStore.windowClause.sessionTimeUnit})`
    }

    const buildSql = () => {
        const select = buildSelectColumnsClause()
        const where = buildWhereClause()
        const order = buildOrderClause()
        const limit = buildLimitClause()
        const window = buildWindowClause()

        if (!select || !database.value || !table.value) return null

        return `SELECT ${select} FROM ${database.value}.${table.value} WHERE ${where} ${window} ${order} ${limit}`
    }

    const setColumnOptionForTable = () => {
        const columns = replaceTsColumnToPseudoColumns()
        let options = []
        for (let i in columns) {
            let col = columns[i]
            if (!col.name || col.disabled) continue
            let opt = {
                title: col.alias ? `${col.alias} (${col.name})` : `${col.name}`,
                dataIndex: col.alias || col.name
            }
            if (["ts", "_wstart", "_wend"].includes(col.name)) opt['width'] = 200
            options.push(opt)
        }
        columnStore.columns.selected = options
        setSelectedChartSeries()
    }

    const disableColumnWithInvalidFunction = () => {
        for (let i in queryBuilderStore.columns.items) {
            let c = queryBuilderStore.columns.items[i]
            queryBuilderStore.columns.items[i].disabled = queryBuilderStore.windowClause.type === "none" ? false : !sqlConfig.availableFunctionsInWindowClause.includes(c.func.toUpperCase())
        }
    }

    const switchOrderBy = () => {
        if (queryBuilderStore.orderBy.column === "none") return
        queryBuilderStore.orderBy.column = ["none", "state", "session"].includes(queryBuilderStore.windowClause.type) ? "ts" : "_wstart"
    }

    const replaceTsColumnToPseudoColumns = () => {
        let result = []
        for (let i in queryBuilderStore.columns.items) {
            let col = queryBuilderStore.columns.items[i]
            if (queryBuilderStore.windowClause.type !== "none" && col.name === "ts") {
                result.push({func: null, name: '_wstart', alias: null, _key: 0, disabled: false})
                result.push({func: null, name: '_wend', alias: null, _key: 0, disabled: false})
            } else {
                result.push({...col})
            }
        }
        return result
    }
    const setFilledValueColumns = () => {
        if (!["value_f", "value"].includes(queryBuilderStore.windowClause.fillMode)) {
            queryBuilderStore.windowClause.filledValueColumn = []
            return
        }
        let result = []
        for (let i in queryBuilderStore.columns.items) {
            let col = queryBuilderStore.columns.items[i]
            if (!col.name) continue
            if (col.name === "ts" || col.name.startsWith("_") || col.disabled) {
                continue
            }
            let oldCol = _.find(queryBuilderStore.windowClause.filledValueColumn, {name: col.name})
            let newCol = {...col}
            if (oldCol) newCol.fillValue = oldCol.fillValue
            result.push(newCol)
        }
        queryBuilderStore.windowClause.filledValueColumn = result
    }

    const resetQueryBuilderState = () => {
        queryBuilderStore.queryCount = 0
        queryBuilderStore.sql = null
        queryBuilderStore.columns.items = [{...sqlConfig.selectClause}]
        queryBuilderStore.orderBy.column = sqlConfig.windowedQueryDefaultOrderColumn
        queryBuilderStore.orderBy.direction = "ASC"
    }

    const execAdvancedSql = () => {
        setAdvancedMode()
        setColumnOptionForTable()
        const sql = buildSql()
        queryBuilderStore.sql = sql
        setRawSql(sql)
        setCountSql(null)
        queryBuilderStore.queryCount = queryBuilderStore.queryCount + 1
        //execSql()
    }

    const registerListener = () => {
        watch([database, table], () => {
            resetQueryBuilderState()
        })
        watch(selectColumns, (n) => {
            disableColumnWithInvalidFunction()
            setFilledValueColumns()
        }, {deep: true})
        watch(windowClauseMode, () => {
            switchOrderBy()
            disableColumnWithInvalidFunction()
        })
        watch(fillMode, () => {
            setFilledValueColumns()
        })
        watch([table, instanceReady], () => {
            if (!table.value || !instanceReady.value || !database.value) return
            queryTags()
            queryTagValues()
        })
    }

    onMounted(() => {

    })
    return {
        registerListener,
        handleFunctionChanged,
        addColumn,
        removeColumn,
        execAdvancedSql,
        resetQueryBuilderState,
        addTagClause,
        removeTagClause
    }
}
