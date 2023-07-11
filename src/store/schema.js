import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {sqlConfig} from "../config/sql-config.js";
import {useColumnStore} from "./column.js";
import {useTagStore} from "./tag.js";

export const useSchemaStore = defineStore('schema', () => {
    const columnStore = useColumnStore()
    const tagStore = useTagStore()
    const state = reactive({
        database: {
            creating: false,
            altering: false
        },
        table: {
            creating: false,
            altering: false
        }
    })

    const databaseStruct = reactive({
        create: {...sqlConfig.schema.database.create},
        alter: {...sqlConfig.schema.database.alter}
    })
    const stableAndNormalStruct = reactive({
        create: {...sqlConfig.schema.stable.create},
        alter: {...sqlConfig.schema.stable.alter}
    })
    const childTableStruct = reactive({
        create: [{...sqlConfig.schema.childTable.create}],
        alter: {...sqlConfig.schema.childTable.alter}
    })

    const alterColumns = computed(() => {
        const columns = []
        for (let i in columnStore.columns.items) {
            const col = columnStore.columns.items[i]
            if (col.colName === "ts") continue
            let type = col.colType.replace(/(\(\d+\))/, "")
            columns.push({
                name: col.colName,
                type: type,
                length: col.colLength,
                minLength: ["NCHAR", "BINARY", "VARCHAR"].includes(type) ? col.colLength : null,
                state: "KEEP",
                lengthChangeable: ["NCHAR", "BINARY", "VARCHAR"].includes(type),
                origin: {
                    name: col.colName,
                    type: type,
                    length: col.colLength
                }
            })
        }
        return columns
    })
    const alterTags = computed(() => {
        const tags = []
        for (let i in tagStore.tags) {
            const tag = tagStore.tags[i]
            let type = tag.tagType.replace(/(\(\d+\))/, "")
            tags.push({
                name: tag.tagName,
                type: type,
                length: tag.tagLength,
                minLength: ["NCHAR", "BINARY", "VARCHAR"].includes(type) ? tag.tagLength : null,
                state: "KEEP",
                lengthChangeable: ["NCHAR", "BINARY", "VARCHAR"].includes(type),
                origin: {
                    name: tag.tagName,
                    type: type,
                    length: tag.tagLength
                }
            })
        }
        return tags
    })
    const childTableTags = computed(() => {
        const tags = []
        for (let i in tagStore.tags) {
            const tag = tagStore.tags[i]
            let type = tag.tagType.replace(/(\(\d+\))/, "")
            tags.push({
                name: tag.tagName,
                value: tag.tagValue,
                type: type,
                origin: {
                    name: tag.tagName,
                    value: tag.tagValue,
                    type: type,
                }
            })
        }
        return tags
    })

    const createDatabaseFormRef = ref()
    const alterDatabaseFormRef = ref()
    const createTableFormRef = ref()
    const alterTableFormRef = ref()
    const createChildTableFormRef = ref()
    const alterChildTableFormRef = ref()
    const childTableCount = ref(1)
    const selectedChildTable = ref()

    const currentDatabase = ref()
    const tableSearchKeyword = ref()
    const tableView = ref('stable')

    return {
        state,
        currentDatabase,
        databaseStruct,
        stableAndNormalStruct,
        childTableStruct,

        createDatabaseFormRef,
        alterDatabaseFormRef,
        createTableFormRef,
        alterTableFormRef,
        createChildTableFormRef,
        alterChildTableFormRef,

        alterColumns,
        alterTags,
        childTableTags,
        childTableCount,
        selectedChildTable,
        tableSearchKeyword,
        tableView
    }
})
